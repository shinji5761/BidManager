// === Entity ===
import { GoogleFinanceEntity } from '../javascript/entity/GoogleFinanceEntity';
import { OneDayEntity } from '../javascript/entity/OneDayEntity';

// === Logger ===
import logger = require('../LogSettings');

import XMLHttpRequest = require('xmlhttprequest');
var xml = XMLHttpRequest.XMLHttpRequest;

/**
 * GoogleFinance 接続サービス
 * 株価データの取得
 * @class GoogleFinanceService
 */
export class GoogleFinanceService {

	/**
	 * ログ
	 * @type {any}
	 */
	private logger :any;

	/**
	 * URL
	 * @type {string}
	 */
	private url :string;

	/**
	 * GoogleFinance 株価データ開始番号
	 * @type {number}
	 */
	private static START_FINANCAL_INDEX :number = 8;

	/**
	 * GoogleFinance 時刻 INDEX
	 * @type {number}
	 */
	private static TIME_INDEX :number = 0;

	/**
	 * GoogleFinance 始値 INDEX
	 * @type {number}
	 */
	private static OPEN_INDEX :number = 4;
	/**
	 * GoogleFinance 高値 INDEX
	 * @type {number}
	 */
	private static HIGH_INDEX :number = 2;
	/**
	 * GoogleFinance 安値 INDEX
	 * @type {number}
	 */
	private static LOW_INDEX :number = 3;
	/**
	 * GoogleFinance 終値 INDEX
	 * @type {number}
	 */
	private static CLOSE_INDEX :number = 1;
	/**
	 * GoogleFinance 出来高 INDEX
	 * @type {number}
	 */
	private static VOLUME_INDEX :number = 5;

	/**
	 * @constructor
	 */
	constructor() {
		this.logger = logger;
		this.url = 'https://www.google.com/finance/getprices?';
	}

	/**
	 * [getFinanceInfo description]
	 * @param  {GoogleFinanceEntity} data
	 * @return {OneDayEntity}
	 */
	public getFinanceInfo(data :GoogleFinanceEntity) :Array<OneDayEntity> {
		this.logger.system.debug('GoogleFinanceService.getFinanceInfo: start');
		this.logger.system.info('GoogleFinanceService.getFinanceInfo: data=' + JSON.stringify(data));
		this.logger.system.info('GoogleFinanceService.getFinanceInfo: url=' + this.url + data.createQueryParams());

		let result :Array<OneDayEntity>;
		let request = new xml();

		try {
			request.open('GET', this.url + data.createQueryParams(), false);
			request.send();
			this.logger.system.info('GoogleFinanceService.getFinanceInfo: response=' + request.responseText);
		} catch(e){
			this.logger.system.error('GoogleFinanceService.getFinanceInfo: error=' + e.getMessage());
		}
		result = this.convert(request.responseText, data.getBrandCode());
		return result;
	}

	/**
	 * コンバーター
	 * @param {Array<OneDayEntity>} result 戻り値
	 * @param {string} response GoogleFinance Response Data
	 * @return {Array<OneDayEntity>}
	 */
	private convert(response :string, code :number) :Array<OneDayEntity> {
		let result :Array<OneDayEntity> = [];

		// ResponseDataを1行ごとに配列にする｡
		// 1行目: MarketOpenMinute
		// 2行目: MarketCloseMinute
		// 3行目: Interval
		// 4行目: カラム説明
		// 8行目~: 市場価格(DATE,CLOSE,HIGH,LOW,OPEN,VOLUME)
		let resArray = response.split(/\r\n|\r|\n/);
		this.logger.system.info('GoogleFinanceService.convert: ' + JSON.stringify(resArray));

		if(!resArray[GoogleFinanceService.START_FINANCAL_INDEX]) {
			this.logger.system.error('GoogleFinanceService.convert: データがありません.');
			return [];
		}

		// 基準日､開場時刻､間隔を求める
		let baseData :Array<any> = resArray[GoogleFinanceService.START_FINANCAL_INDEX].split(',');
		let marketOpenTime :number = Number(resArray[1].split('=')[1]);
		let interval :number = Number(resArray[3].split('=')[1]);
		let startDate :Date = this.calcInterval(Number(baseData[0].substr(1)), 0, interval);

		this.logger.system.info('GoogleFinanceService.convert: startDate=' + startDate.getFullYear() + startDate.getMonth() + startDate.getDate());
		this.logger.system.info('GoogleFinanceService.convert: marketOpenTime=' + marketOpenTime);
		this.logger.system.info('GoogleFinanceService.convert: interval=' + interval);

		// 基準日のデータを作成する
		result.push(
			new OneDayEntity(
				code,
				startDate,
				baseData[GoogleFinanceService.OPEN_INDEX],
				baseData[GoogleFinanceService.HIGH_INDEX],
				baseData[GoogleFinanceService.LOW_INDEX],
				baseData[GoogleFinanceService.CLOSE_INDEX],
				baseData[GoogleFinanceService.VOLUME_INDEX]
			)
		);
		// 基準日以降のデータを取得する
		// 最後に空文字が入っているため､長さを-1する
		for(let index :number = GoogleFinanceService.START_FINANCAL_INDEX + 1; index < resArray.length - 1; index++) {
			let data :Array<any> = resArray[index].split(',');

			// 日付を求める
			result.push(
				new OneDayEntity(
					code,
					this.calcInterval(Number(baseData[0].substr(1)), data[GoogleFinanceService.TIME_INDEX], interval),
					data[GoogleFinanceService.OPEN_INDEX],
					data[GoogleFinanceService.HIGH_INDEX],
					data[GoogleFinanceService.LOW_INDEX],
					data[GoogleFinanceService.CLOSE_INDEX],
					data[GoogleFinanceService.VOLUME_INDEX]
				)
			);
		}
		return result;
	}

	/**
	 * 基準日から､n日後の日付を求める
	 * @param  {number} base   基準日時
	 * @param  {number} n 番号
	 * @param {number} interval 間隔
	 * @return {Date} 日付け
	 */
	private calcInterval(base :number, n :number, interval :number) :Date {
		let target = new Date((base + n * interval) * 1000);
		return target;
	}



}
