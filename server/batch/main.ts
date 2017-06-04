// === DaoCreater ===
import { DBDaoCreater } from '../javascript/daoCreater/db/DBDaoCreater';

// === Dao ===
import { MarketInfoDao } from '../javascript/dao/market_info/MarketInfoDao'
import { BrandListDao } from '../javascript/dao/brand_list/BrandListDao';

// === Service ===
import { GoogleFinanceService } from './GoogleFinanceService';

// === Entity ===
import { GoogleFinanceEntity } from '../javascript/entity/GoogleFinanceEntity';
import { MarketInfoEntity } from '../javascript/entity/market_info/MarketInfoEntity'

// === Logger ===
import logger = require('../LogSettings');

import Promise = require('promise');


/**
 * バッチ メインクラス
 * 本バッチは､GoogleFinanceから
 * 株価のデータを取得するためのバッチである｡
 * @class Main
 */
class Main {
	/**
	 * ログ
	 * @type {any}
	 */
	private logger :any;

	/**
	 * MarketInfoDao
	 * @private
	 * @type {MarketInfoDao}
	 */
	private marketInfoDao :MarketInfoDao;

	/**
	 * BrandListDao
	 * @private
	 * @type {BrandListDao}
	 */
	private brandListDao :BrandListDao;

	/**
	 * GoogleFinanceService
	 * @private
	 * @type {GoogleFinanceService}
	 */
	private service :GoogleFinanceService;

	/**
	 * 期間
	 * @type {string}
	 */
	private term :string;

	/**
	 * 刻み
	 * @type {number}
	 */
	private step :number;

	/**
	 * 市場
	 * @type {string}
	 */
	private market :string;


	/**
	 * @constructor
	 */
	constructor() {
		this.logger = logger;
		let daocreater = new DBDaoCreater();
		this.marketInfoDao = daocreater.getMarketInfoDao();
		this.brandListDao = daocreater.getBrandListDao();
		this.service = new GoogleFinanceService();

		// 標準入力パラメータ取得
		this.getBasicInput();
	}

	/**
	 * [run description]
	 */
	private getBasicInput() :void {
		this.logger.system.debug('Main.getBasicInput: start');
		// processは標準のもののため､エラーとなっているが問題ない
		this.logger.system.debug(JSON.stringify(process.argv));
		this.term = process.argv[2];
		this.step = process.argv[3];
		this.market = process.argv[4];
	}

	/**
	 * バッチ実行処理
	 * @return {void}
	 */
	public run() :void {
		this.logger.system.debug('Main.run: start');
		// 銘柄コードの取得
		let key = {};
		let body = {};
		let query = {};
		this.brandListDao.query(key, body, query,
			// onSuccess
			(result) => {
				this.logger.system.debug('Main.run.onSuccess: start');
				this.logger.system.info('Main.run.onSuccess: ' + JSON.stringify(result));
				this.getBidInfo(result);
			},
			// onFail
			(error) => {
				this.logger.system.debug('Main.run.onFail: start');
				this.logger.system.error('Main.run.onFail: ' + JSON.stringify(error));
			},
			this
		);
	}

	/**
	 * 株価データ取得
	 * @private
	 * @param {Array<Object>} data 銘柄コードデータ
	 * @return {void}
	 */
	private getBidInfo(data) :void {
		this.logger.system.debug('Main.getBidInfo: start');
		var requestList :Array<any> = [];

		for(let index in data) {
			// 銘柄コードのデータ取得
			let result : Array<MarketInfoEntity> = (this.service.getFinanceInfo(new GoogleFinanceEntity(this.term, this.step, data[index].brandCode, this.market)));
			this.logger.system.info('Main.getBidInfo: result=' + JSON.stringify(result));

			// 90日分のデータをinsertする
			for(let i in result) {
				let key = {
					'brandCode': result[i].getBrandCode(),
					'targetDate': result[i].getTargetDate(),
					'hour' : result[i].getHour(),
					'min' : result[i].getMin()
				};

				let body = {
					'open': result[i].getOpen(),
					'high': result[i].getHigh(),
					'low': result[i].getLow(),
					'close': result[i].getClose(),
					'volume': result[i].getVolume()
				};
				requestList.push(this.postBidInfo(key, body));
			}
		}
		this.logger.system.info('Main.getBidInfo: requestList=' + JSON.stringify(requestList));
		Promise.all(requestList)
		.then((res) => {
			this.logger.system.debug('main.getBidInfo: 終了---');
			this.exit();
		});
	}

	/**
	 *
	 * @param key
	 * @param body
	 */
	private postBidInfo(key :Object, body :Object) :any {
		this.logger.system.debug('Main.postBidInfo: key=' + JSON.stringify(key));
		this.logger.system.debug('Main.postBidInfo: body=' + JSON.stringify(body));

		return new Promise((resolve, reject) => {
			this.logger.system.debug('Main.Observable.create: start');
			this.marketInfoDao.post(key, body,
				// onSuccess
				(data) => {
					this.logger.system.info('Main.postBidInfo.onSuccess: ' + JSON.stringify(data));
					resolve();
				},
				// onFail
				(error) => {
					this.logger.system.error('Main.postBidInfo.onFail: ' + JSON.stringify(error));
					reject();
				},
				this
			);
		});
	}


	/**
	 * node.js 終了処理
	 * @public
	 * @return {void}
	 */
	public exit() :void {
		process.exit();
	}

}
let main = new Main();
main.run();
// main.exit();
