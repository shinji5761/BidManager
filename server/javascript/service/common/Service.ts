// === Logger ===
import logger = require('../../../LogSettings');

// === Entity ===
import { SQLParams } from '../../entity/SQLParams';

/**
 * Service
 * @class
 */
export abstract class Service {
	/**
	 * ログ
	 * @type {any}
	 */
	protected logger :any;

	/**
	 * @constructor
	 */
	constructor() {
		this.logger = logger;
	}


	/**
	 * 検索条件作成処理 
	 * 実行するSQLのパラメータを返却する｡
	 * @param {any} body ボディデータ
	 */
	public createGetParams(body :any) :SQLParams {
		this.logger.system.debug('Service.createGetParams');
		return new SQLParams('',[]);
	}

	/**
	 * 追加データ作成処理
	 * @param {any} body ボディデータ
	 */
	public createPostParams(body :any) :SQLParams {
		this.logger.system.debug('Service.createPostParams');
		return new SQLParams('',[]);
	};

	/**
	 * 追加データ作成処理
	 * @param {any} body ボディデータ
	 */
	public createPutParams(body :any) :SQLParams {
		this.logger.system.debug('Service.createPutParams');
		return new SQLParams('',[]);
	};

	/**
	 * 削除データ作成処理
	 * @param {any} body ボディデータ
	 */
	public createDeleteParams(body :any) :SQLParams {
		this.logger.system.debug('Service.createDeleteParams');
		return new SQLParams('',[]);
	};

	/**
	 * 検索条件を付加する
	 * @param keys
	 * @param params
	 */
	public addSearchParam(searchParams :Object, params :Object) :void {
		this.logger.system.debug('Service.addSearchParam');
		let keys = Object.keys(searchParams);
		keys.forEach((key, index) => {
			if(index < 1) {
				params['sql'] += ' WHERE ' + key + ' = ?';
			}
			else {
				params['sql'] += ' AND ' + key + ' = ?';
			}
			params['data'].push(searchParams[key]);
		});
	}


	/**
	 * 検索結果加工処理
	 * 加工しない場合はそのままリターン
	 * 加工する場合はオーバーライドで処理を記述する｡
	 * @public
	 * @param {any} data 加工対象のデータ
	 * @return {any} 加工データ
	 */
	public createResultData(data :any) :any {
		this.logger.system.debug('Service.createResultData');
		return data;
	}



}
