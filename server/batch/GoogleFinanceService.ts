// === Entity ===
import { GoogleFinanceEntity } from '../javascript/entity/GoogleFinanceEntity';
import { OneDayEntity } from '../javascript/entity/OneDayEntity';

/**
 * GoogleFinance 接続サービス
 * 株価データの取得
 * @class GoogleFinanceService
 */
export class GoogleFinanceService {

    /**
     * [getFinanceInfo description]
     * @param  {GoogleFinanceEntity} data
     * @return {OneDayEntity}
     */
    public getFinanceInfo(data :GoogleFinanceEntity) :OneDayEntity {
        return new OneDayEntity(6760, new Date(), 100, 120, 90, 95, 10000);
    }

}
