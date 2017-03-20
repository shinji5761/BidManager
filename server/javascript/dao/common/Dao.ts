import mysql = require('mysql2');
import { DaoConst } from './DaoConst';

/**
 * Dao共通クラス
 * @class {Dao} Dao
 */
export class Dao {
	/**
	 * HOST
	 * @private
	 * @type {string}
	 */
	private HOST: string = 'localhost';

	/**
	 * USER
	 * @private
	 * @type {string}
	 */
	private USER: string = 'admin';

	/**
	 * POSSWORD
	 * @private
	 * @type {string}
	 */
	private PASSWORD: string = 'admin';

	/**
	 * DATABASE
	 * @private
	 * @type {string}
	 */
	private DATABASE: string = 'bid_manager';

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
	 * @constructor
	 */
	constructor() {
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
	 * @param {string} sql 実行するSQL文
	 * @param {Array<any>} params パラメータ 
	 * @param {Function} onSuccess 
	 * @param {Function} onFail 
	 * @param {Object} caller
	 */
	public get(sql, params, onSuccess, onFail, caller): void {
		// サーバー接続
		let rows = [];
		let query = this.connection.query(sql, params);
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
	 * @param {string} sql 実行するSQL文
	 * @param {Array<any>} params パラメータ 
	 * @param {Function} onSuccess 
	 * @param {Function} onFail 
	 * @param {Object} caller
	 */
	public post(sql, params, onSuccess, onFail, caller): void {
		// サーバー接続
		let query = this.connection.query(sql, params);
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
	 * update
	 * @param {string} sql 実行するSQL文
	 * @param {Array<any>} params パラメータ 
	 * @param {Function} onSuccess 
	 * @param {Function} onFail 
	 * @param {Object} caller
	 */
	public put(sql, params, onSuccess, onFail, caller) :void {
	}

	/**
	 * delete
	 * @param {string} sql 実行するSQL文
	 * @param {Array<any>} params パラメータ 
	 * @param {Function} onSuccess 
	 * @param {Function} onFail 
	 * @param {Object} caller
	 */
	public delete(sql, params, onSuccess, onFail, caller) :void {
	}
}