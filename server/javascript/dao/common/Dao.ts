import mysql = require('mysql');

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

	public const :DaoConst;

	/**
	 * MySQLコネクション
	 * @private 
	 */
	public connection;

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
	 * @param {Function} onSuccess 
	 * @param {Function} onFail 
	 * @param {Object} caller
	 */
	public get(onSuccess, onFail, caller): void {
	}

	/**
	 * ポートフォリオ Post
	 * @param {Function} onSuccess 
	 * @param {Function} onFail 
	 * @param {Object} caller
	 */
	public post(onSuccess, onFail, caller): void {
	}

	/**
	 * update
	 * @param {Function} onSuccess 
	 * @param {Function} onFail 
	 * @param {Object} caller
	 */
	public update(onSuccess, onFail, caller) :void {
	}

	/**
	 * delete
	 * @param {Function} onSuccess 
	 * @param {Function} onFail 
	 * @param {Object} caller
	 */
	public delete(onSuccess, onFail, caller) :void {
	}
}