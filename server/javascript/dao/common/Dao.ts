import mysql = require('mysql2');
import { DaoConst } from './DaoConst';

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
	 * HOST
	 * @private
	 * @type {string}
	 */
	private HOST :string = 'localhost';

	/**
	 * USER
	 * @private
	 * @type {string}
	 */
	private USER :string = 'admin';

	/**
	 * POSSWORD
	 * @private
	 * @type {string}
	 */
	private PASSWORD :string = 'admin';

	/**
	 * DATABASE
	 * @private
	 * @type {string}
	 */
	private DATABASE :string = 'bid_manager';

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
	 * Serviceクラス
	 * @protected
	 */
	protected service :any;

	/**
	 * @constructor
	 */
	constructor(service :any) {
		// MySQL 接続
		this.connection = mysql.createConnection(
			{
				'host': this.HOST,
				'user': this.USER,
				'password': this.PASSWORD,
				'database': this.DATABASE,
			}
		);
		this.const = new DaoConst();
		this.service = new service();
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
	 * ポートフォリオ Get
	 * @param {Array<any>} body リクエストボディデータ
	 * @param {Function} onSuccess
	 * @param {Function} onFail
	 * @param {Object} caller
	 */
	public get(body, onSuccess, onFail, caller): void {
		this.logger.system.debug('Dao.get: start');
		// SQLパラメータの作成
		let params = this.service.createGetParams(body);
		this.logger.system.info('Dao.get: SQL=' + params.sql + ', data=' + JSON.stringify(params.data));

		// サーバー接続
		let rows = [];
		let query = this.connection.query(params.sql, params.data);
		query
		.on('error', (error) => {
			onFail.call(caller, error, this.const.ERROR_CODE_OTHER);
		})
		.on('result', (row) => {
			rows.push(row);
		})
		.on('end', () => {
			// レコードが空の場合
			if(rows.length == 0) {
				onFail.call(caller, rows, this.const.ERROR_CODE_NOT_FOUND);
				return;
			}
			// 成功の場合
			onSuccess.call(caller, rows);
		});
	}

	/**
	 * Post
	 * @param {Array<any>} params
	 * @param {Function} onSuccess
	 * @param {Function} onFail
	 * @param {Object} caller
	 */
	public post(body, onSuccess, onFail, caller): void {
		this.logger.system.debug('Dao.post: start');
		// SQLパラメータの作成
		let params = this.service.createPostParams(body);
		this.logger.system.info('Dao.post: SQL=' + params.sql + ', data=' + JSON.stringify(params.data));

		// トランザクション開始
		this.connection.beginTransaction( (tError) => {
			if(tError) {
				onFail.call(caller, tError, this.const.ERROR_CODE_OTHER);
			}
			// サーバー接続
			let query = this.connection.query(params.sql, params.data);
			let data;
			query
			.on('error', (error) => {
				// ロールバック
				this.runRollback(error, this.const.ERROR_CODE_OTHER, onFail, caller);
			})
			.on('result', (result) => {
				data = result;
			})
			.on('end', (result) => {
				// コミット
				this.runCommit(data, onSuccess, onFail, caller);
			});
		});
	}

	/**
	 * Put
	 * @param {Array<any>} body パラメータ
	 * @param {Function} onSuccess
	 * @param {Function} onFail
	 * @param {Object} caller
	 */
	public put(body, onSuccess, onFail, caller) :void {
		this.logger.system.debug('Dao.put: start');
		// SQLパラメータの作成
		let params = this.service.createPutParams(body);
		this.logger.system.info('Dao.put: SQL=' + params.sql + ', data=' + JSON.stringify(params.data));

		// トランザクション開始
		this.connection.beginTransaction((tError) => {
			// サーバー接続
			let query = this.connection.query(params.sql, params.data);
			let data;
			query
			.on('error', (error) => {
				// ロールバック
				this.runRollback(error, this.const.ERROR_CODE_OTHER, onFail, caller);
			})
			.on('result', (result) => {
				data = result;
			})
			.on('end', (result) => {
				// コミット
				this.runCommit(data, onSuccess, onFail, caller);
			});
		});
	}

	/**
	 * Delete
	 * @param {Array<any>} body パラメータ
	 * @param {Function} onSuccess
	 * @param {Function} onFail
	 * @param {Object} caller
	 */
	public delete(body, onSuccess, onFail, caller) :void {
		this.logger.system.debug('Dao.delete: start');
		// SQLパラメータの作成
		let params = this.service.createDeleteParams(body);
		this.logger.system.info('Dao.delete: SQL=' + params.sql + ', data=' + JSON.stringify(params.data));

		// トランザクション開始
		this.connection.beginTransaction((tError) => {
			// サーバー接続
			let query = this.connection.query(params.sql, params.data);
			let data;
			query
			.on('error', (error) => {
				// ロールバック
				this.runRollback(error, this.const.ERROR_CODE_OTHER, onFail, caller);
			})
			.on('result', (result) => {
				data = result;
			})
			.on('end', (result) => {
				// コミット
				this.runCommit(data, onSuccess, onFail, caller);
			});
		});
	}

	/**
	 * コミット実行
	 * 成功 : onSuccess
	 * 失敗 : onFail
	 * @param {any}      data     [description]
	 * @param {Function} onSuccess [description]
	 * @param {Function} onFail   [description]
	 * @param {Object}   caller   [description]
	 */
	protected runCommit(data :any, onSuccess :Function, onFail :Function, caller :Object) :void {
		// コミット
		this.connection.commit((error) => {
			if(error) {
				// ロールバック
				this.runRollback(error, this.const.ERROR_CODE_OTHER, onFail, caller);
				onFail.call(caller, error);
			}
			this.logger.system.debug("Dao.runCommit : 結果にコミットしました｡")
			onSuccess.call(caller, data);
		});
	}

	/**
	 * [runRollback description]
	 * @param  {any}      error  [description]
	 * @param  {number}   code   [description]
	 * @param  {Function} onFail [description]
	 * @param  {Object}   caller [description]
	 * @return {[type]}          [description]
	 */
	protected runRollback(error :any, code :number, onFail :Function, caller :Object) {
		// ロールバック
		this.connection.rollback(() => {
			onFail.call(caller, error, code);
		})
	}

}
