import { DaoConst } from './DaoConst';

// === DaoManager ===
import { Manager } from '../../manager/common/Manager';

// === Entity ===
import { SQLParams } from '../../entity/SQLParams';

// === Logger ===
import logger = require('../../../LogSettings');

/**
 * Dao共通クラス
 * @class {Dao} Dao
 */
export abstract class Dao {
	/**
	 * ログ
	 * @type {any}
	 */
	protected logger :any;


	/**
	 * Dao用 定数オブジェクト
	 * @protected
	 * @type {DaoConst}
	 */
	protected const :DaoConst;

	/**
	 * MySQLコネクション
	 * @protected
	 */
	protected connection;

	/**
	 * Managerクラス
	 * @protected
	 */
	protected manager :any;

	/**
	 * @constructor
	 */
	constructor(connection, manager) {
		// MySQL 接続
		this.connection = connection;
		this.const = new DaoConst();
		this.manager = new manager();
		this.logger = logger;
	}


	/**
	 * Getter(connection)
	 * @public
	 * @return
	 */
	public getConnection() :any {
		return this.connection;
	}

	/**
	 * Get
	 * @param {Object} key
	 * @param {Object} body
	 * @param {Object} query
	 * @param {Function} onSuccess
	 * @param {Function} onFail
	 * @param {Object} caller
	 */
	public get(key, body, query, onSuccess, onFail, caller): void {
		this.logger.system.debug('Dao.get: start');
		// SQLパラメータの作成
		let params :SQLParams = this.manager.createGetParams(key, body, query);
		// サーバー接続
		let request = this.connection.query(params.getSQL(), params.getData(), (error, result) => {
			if(error) {
				onFail.call(caller, error, this.const.ERROR_CODE_OTHER);
			}
			// 成功の場合
			onSuccess.call(caller, result);
		});
		this.logger.system.info('Dao.get: params=' + params.getSQL() + ', data=' + JSON.stringify(params.getData()));
		this.logger.system.info('Dao.get: SQL=' + request.sql);
	}

	/**
	 * Query
	 * @param {Object} key
	 * @param {Object} body
	 * @param {Object} query
	 * @param {Function} onSuccess
	 * @param {Function} onFail
	 * @param {Object} caller
	 */
	public query(key :Object, body :Object, query :Object, onSuccess :Function, onFail :Function, caller :Object) :void {
		this.logger.system.debug('Dao.query: start');
		// SQLパラメータの作成
		let params :SQLParams = this.manager.createQueryParams(key, body, query);
		// サーバー接続
		let request = this.connection.query(params.getSQL(), params.getData(), (error, result) => {
			if(error) {
				onFail.call(caller, error, this.const.ERROR_CODE_OTHER);
			}
			// 成功の場合
			onSuccess.call(caller, result);
		});
		this.logger.system.info('Dao.query: params=' + params.getSQL() + ', data=' + JSON.stringify(params.getData()));
		this.logger.system.info('Dao.query: SQL=' + request.sql);
	}

	/**
	 * Post
	 * @param {Object}		key			[description]
	 * @param {Object}		body		[description]
	 * @param {Function}	onSuccess	[description]
	 * @param {Function}	onFail		[description]
	 * @param {Object}		caller		[description]
	 */
	 public post(key :Object, body :Object, onSuccess :Function, onFail :Function, caller :Object) :void {
		// DaoManagerからSQL､Dataを取得する
		let params :SQLParams = this.manager.createPostParams(key, body);
		// サーバー接続
		let request = this.connection.query(params.getSQL(), params.getData(), (error, result) => {
			if(error) {
				onFail.call(caller, error, this.const.ERROR_CODE_OTHER);
			}
			// 成功の場合
			onSuccess.call(caller, result);
		});
		this.logger.system.info('Dao.post: params=' + params.getSQL() + ', data=' + JSON.stringify(params.getData()));
		this.logger.system.info('Dao.post: SQL=' + request.sql);
	}

	/**
	 * Put
	 * @param {Object}		key			[description]
	 * @param {Object}		body		[description]
	 * @param {Function}	onSuccess	[description]
	 * @param {Function}	onFail		[description]
	 * @param {Object}		caller		[description]
	 */
	 public put(key :Object, body :Object, onSuccess :Function, onFail :Function, caller :Object) :void {
	}

	/**
	 * Delete
	 * @param {Array<any>} body パラメータ
	 * @param {Function} onSuccess
	 * @param {Function} onFail
	 * @param {Object} caller
	 */
	public delete(key, body, onSuccess, onFail, caller) :void {
		// DaoManagerからSQL､Dataを取得する
		let params :SQLParams = this.manager.createDeleteParams(key, body);
		// サーバー接続
		let request = this.connection.query(params.getSQL(), params.getData(), (error, result) => {
			if(error) {
				onFail.call(caller, error, this.const.ERROR_CODE_OTHER);
			}
			// 成功の場合
			onSuccess.call(caller, result);
		});
		this.logger.system.info('Dao.post: params=' + params.getSQL() + ', data=' + JSON.stringify(params.getData()));
		this.logger.system.info('Dao.post: SQL=' + request.sql);
	}
}
