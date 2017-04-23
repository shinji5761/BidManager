// === Service ===
import { Service } from '../common/Service';

// === Entity ===
import { SQLParams } from '../../entity/SQLParams';

/**
 * @class PortfolioListService
 * @extends Service
 */
export class PortfolioListService extends Service {

	/**
	 * @constructor
	 */
	constructor() {
		super();
	}

	/**
	 * 検索データ作成処理
	 * @override
	 * @public
	 * @param {any} body リクエストボディ
	 * @return {SQLParams} SQL実行パラメータ
	 */
	public createGetParams(body :any) :SQLParams {
		this.logger.system.debug('PortfolioListService.createGetParams: start');
		let params = new SQLParams(
			'SELECT * FROM portfolio_list',
			[]
		);
		return params;
	}

}
