import { Service } from '../common/Service';

/**
 * PortfolioService
 * @class
 * @extends Service
 */
export class PortfolioService extends Service {

	/**
	 * @constructor
	 */
	constructor() {
		super();
	}


	/**
	 * 検索データ作成処理
	 * @override 
	 * @param {any} params 条件
	 */
	public createGetParams(body :any) :Object {
		let params = {
			'sql': 'SELECT * FROM portfolio', 
			'data': []
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
			'sql': 'INSERT INTO portfolio SET ?',
			'data': {'name': body.name}
		};
		return params;
	}

	/**
	 * 
	 * @param body 
	 */
	public createPutParams(body :any) :Object {
		let params = {
			'sql': 'UPDATE portfolio SET name = ?',
			'data': [body.name]
		};
		let searchParams = {};
		searchParams['no'] = body.no;
		this.addSearchParam(searchParams, params);
		return params;
	}
}