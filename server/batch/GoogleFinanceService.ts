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

        try {
            let request = new xml();
            request.open('GET', this.url + data.createQueryParams(), false);
            request.send();
            this.logger.system.info('GoogleFinanceService.getFinanceInfo: response=' + request.responseText);
            this.convert(result, request.responseText);
        } catch(e){
            this.logger.system.error('GoogleFinanceService.getFinanceInfo: error=' + e.getMessage());
        }
        return result;
    }

    /**
     * コンバーター
     * @param {Array<OneDayEntity>} result 戻り値
     * @param {string} response GoogleFinance Response Data
     */
    private convert(result :Array<OneDayEntity>, resonce :string) :void {

    }
    
}
