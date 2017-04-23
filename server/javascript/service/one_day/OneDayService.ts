// === Service ===
import { Service } from '../common/Service';

// === Entity ===
import { SQLParams } from '../../entity/SQLParams';

/**
 * @class OneDayService
 * @extends Service
 */
export class OneDayService extends Service {

	/**
	 * 検索データ作成処理
	 * @override
	 * @public
	 * @param {any} body リクエストボディ
	 * @return {SQLParams} SQL実行パラメータ
	 */
	public createGetParams(body :any) :SQLParams {
		this.logger.system.debug('OneDayService.createGetParams: start');
		let brandCode :number = body.brandCode;			// 銘柄番号
		let params = new SQLParams(
			'SELECT brand_code AS brandCode, DATE_FORMAT(target_date, \'%y/%m/%d\') AS targetDate, open, high, low, close, volume FROM one_day WHERE brand_code = ? ORDER BY target_date LIMIT 90',
			[brandCode]
		);
		return params;
	}


    /**
     * [createPostParams description]
     * @override
	 * @param {any} body ボディデータ
     */
    public createPostParams(body :any) :SQLParams {
        this.logger.system.debug('OneDayService.cratePostParams: start');
		let params = new SQLParams(
			'INSERT INTO bid_manager.one_day(brand_code, target_date, open, high, low, close, volume)  VALUES(?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE high=?, low=?, close=?, volume=?',
			[body.brandCode, body.targetDate, body.open, body.high, body.low,  body.close, body.volume, body.open, body.high, body.low,  body.close, body.volume]
		);
        return params;
    }
}
