// === Dao ===
import { OneDayDao } from '../javascript/dao/one_day/OneDayDao';
import { BrandListDao } from '../javascript/dao/brand_list/BrandListDao';

// === Service ===
import { GoogleFinanceService } from './GoogleFinanceService';

// === Entity ===
import { GoogleFinanceEntity } from '../javascript/entity/GoogleFinanceEntity';
import { OneDayEntity } from '../javascript/entity/OneDayEntity';

// === Logger ===
import logger = require('../LogSettings');


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
     * OneDayDao
     * @private
     * @type {OneDayDao}
     */
    private oneDayDao :OneDayDao;

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
        this.oneDayDao = new OneDayDao();
        this.brandListDao = new BrandListDao();
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
        let body = {};
        this.brandListDao.get(body,
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
        for(let index in data) {
            // 銘柄コードのデータ取得
            let result = (this.service.getFinanceInfo(new GoogleFinanceEntity(this.term, this.step, data[index].code, this.market)));
            // 90日分のデータをinsertする
            for(let i in result) {
                let body = {
                    'code': result[i].getCode(),
                    'targetDate': result[i].getTargetDate(),
                    'open': result[i].getOpen(),
                    'high': result[i].getHigh(),
                    'low': result[i].getLow(),
                    'close': result[i].getClose(),
                    'volume': result[i].getVolume()
                };
                this.oneDayDao.post(body,
                    // onSuccess
                    (data) => {
                        this.logger.system.debug('Main.getBidInfo.onSuccess: start');
                        this.logger.system.info('Main.getBidInfo.onSuccess: ' + JSON.stringify(data));
                    },
                    // onFail
                    (error) => {
                        this.logger.system.debug('Main.run.onFail: start');
                        this.logger.system.error('Main.run.onFail: ' + JSON.stringify(error));
                    },
                    this
                );
            }
        }
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
