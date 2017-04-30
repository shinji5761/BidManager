// === Service ===
import { Service } from '../common/Service';

// === Entity ===
import { SQLParams } from '../../entity/SQLParams';

/**
 * @class BrandListService
 * @extends Service
 */
export class BrandListService extends Service {

	/**
 	* @constructor
 	*/
	constructor() {
		super();
	}

	/**
	 * 検索データ作成処理
	 * @override
	 * @param  {any}    body ボディデータ
	 * @return {Object}      SQLパラメータ
	 */
	public createGetParams(body :any) :SQLParams {
		this.logger.system.debug('BrandListService.createGetParams: start');
		let params = new SQLParams(
			'SELECT brandCode FROM brand_list',
			[]
		)
		return params;
	}
}
