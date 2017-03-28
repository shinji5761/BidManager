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

		// サーバー接続
		let query = this.connection.query(params.sql, params.data);
		let data;
		query
		.on('error', (error) => {
			onFail.call(caller, error, this.const.ERROR_CODE_OTHER);
		})
		.on('result', (result) => {
			data = result;
		})
		.on('end', (result) => {
			// 成功の場合
			onSuccess.call(caller, data);
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

		// サーバー接続
		let query = this.connection.query(params.sql, params.data);
		let data;
		query
		.on('error', (error) => {
			onFail.call(caller, error, this.const.ERROR_CODE_OTHER);
		})
		.on('result', (result) => {
			data = result;
		})
		.on('end', (result) => {
			// 成功の場合
			onSuccess.call(caller, data);
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

		// サーバー接続
		let query = this.connection.query(params.sql, params.data);
		let data;
		query
		.on('error', (error) => {
			onFail.call(caller, error, this.const.ERROR_CODE_OTHER);
		})
		.on('result', (result) => {
			data = result;
		})
		.on('end', (result) => {
			// 成功の場合
			onSuccess.call(caller, data);
		});
	}
}
