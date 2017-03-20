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
		let params = {
			'sql': 'SELECT code, name, price, stock FROM purchases WHERE no = ? ORDER BY code',
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
		let params = {
			'sql': 'SELECT func_create_purchases(?, ?, ?, ?)',
			'data': [Number(body.no), Number(body.code), body.price, body.stock]
		};
		return params;
	}

	/**
	 * DeleteSQL文作成処理
	 */
	public createDeleteParams(body :any) :Object {
		console.log(body.no);
		let params = {
			sql: 'SELECT func_delete_purchases(' + Number(body.no) +')',
			data: []
		};
		return params;
	}
}