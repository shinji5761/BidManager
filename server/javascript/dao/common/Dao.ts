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

	/**
	 * URL
	 * @private
	 * @type {string}
	 */
	private url: string ='';


	public const :DaoConst;

	/**
	 * MySQLコネクション
	 * @private 
	 */
	public connection;

	/**
	 * @constructor
	 */
	constructor(url: string) {
		// urlの設定
		this.url = url;

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
	 * エラー処理
	 * @param {string} eMessage
	 * @param {number} status 
	 */
	public isError(eMessage, status, response) :void {
		response.status(status).send(eMessage);
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
	 * Getter(url)
	 * @return {string} url
	 */
	public getUrl() :string {
		return this.url;
	}

	/**
	 * ポートフォリオ Get
	 * @param req 
	 * @param res 
	 */
	public get(req, res): void {
	}

	/**
	 * ポートフォリオ Post
	 * @param req 
	 * @param res 
	 */
	public post(req, res): void {
	}

}