/**
 * @fileoverview PortfolioDao.ts
 * @author shinji5761@gmail.com
 */
import { Dao } from '../common/Dao';

/**
 * ポートフォリオクラス
 * @class {PurchasesDao} PurchasesDao
 * @extends Dao
 */
export class PurchasesDao extends Dao {

	/**
	 * @constructor
	 */
	constructor(){
		super();
	};


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
		let query = this.connection.execute(sql, params);
		let data;
		query
		.on('error', (error) => {
			onFail.call(caller, error, this.const.ERROR_CODE_OTHER);
		})
		.on('result', (result) => {
			data = result;
		})
		.on('end', () => {
			// 成功の場合
			onSuccess.call(caller, data);
		});
	}
}