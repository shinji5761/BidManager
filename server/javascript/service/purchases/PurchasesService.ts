import { Service } from '../common/Service';

/**
 * PurchasesService
 * @class
 * @extends Service
 */
export class PurchasesService extends Service {

	/**
	 * @constructor
	 */
	constructor() {
		super();
	}

	/**
	 * 検索データ作成処理
	 * @override
	 * @param {any} body ボディデータ
	 */
	public createGetParams(body :any) :any {
		this.logger.system.debug('PurchasesService.createGetParams: start');
		let params = {
			'sql': 'SELECT code, brand_no AS brandNo, name, price, stock FROM purchases WHERE no = ? ORDER BY brandNo',
			'data': [Number(body.no)]
		}
		return params;
	}

	/**
	 * 追加データ作成処理
	 * @override
	 * @param {any} body ボディデータ
	 */
	public createPostParams(body :any) :Object {
		this.logger.system.debug('PurchasesService.createPostParams: start');
		let params = {
			'sql': 'SELECT func_create_purchases(?, ?, ?, ?, ?, ?)',
			'data': [Number(body.no), Number(body.brandNo), Number(body.code), body.name, body.price, body.stock]
		};
		return params;
	}

	/**
	 * DeleteSQL文作成処理
	 */
	public createDeleteParams(body :any) :Object {
		this.logger.system.debug('PurchasesService.createDeleteParams: start');
		console.log(body.no);
		let params = {
			sql: 'SELECT func_delete_purchases(' + Number(body.no) +')',
			data: []
		};
		return params;
	}
}
