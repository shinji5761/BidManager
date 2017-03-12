/**
 * @fileoverview PortfolioDao.ts
 * @author shinji5761
 */

import { Dao } from '../common/Dao';

import { Portfolio } from '../../entity/portfolio';

/**
 * ポートフォリオクラス
 * @class {PortfolioDao} PortfolioDao
 */
export class PortfolioDao extends Dao {

	/**
	 * @constructor
	 */
	constructor(){
		super();
	};

	/**
	 * ポートフォリオ Get
	 * @param {Function} onSuccess 
	 * @param {Function} onFail 
	 * @param {Object} caller
	 */
	public get(onSuccess, onFail, caller): void {
		// サーバー接続
		this.getConnection().query(
			'SELECT * FROM portfolio',
			[],
			(error, data, fieleds) => {
				// エラーが発生した場合
				if(error) {
					onFail.call(caller, error, this.const.ERROR_CODE_OTHER);
				}
				// レコードが空の場合
				else if(data.length == 0) {
					onFail.call(caller, error, this.const.ERROR_CODE_NOT_FOUND);
					return;
				}
				// 成功の場合
				onSuccess.call(caller, data);
			}
		);
	}

	/**
	 * ポートフォリオ Post
	 * @param {Function} onSuccess 
	 * @param {Function} onFail 
	 * @param {Object} caller
	 */
	public post(onSuccess, onFail, caller): void {

	}
}