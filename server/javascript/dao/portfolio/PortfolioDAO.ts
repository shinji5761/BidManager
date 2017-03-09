/**
 * @fileoverview PortfolioDAO.ts
 * @author shinji5761
 */

import { Dao } from '../common/Dao';

import { Portfolio } from '../../entity/portfolio';

/**
 * ポートフォリオクラス
 * @class {PortfolioDAO} PortfolioDAO
 */
export class PortfolioDAO extends Dao {

	/**
	 * @constructor
	 */
	constructor(){
		super('/portfolio');
	};

	/**
	 * ポートフォリオ Get
	 * @param req 
	 * @param res 
	 */
	public get(req, res): void {
		// サーバー接続
		this.getConnection().query(
			'SELECT * FROM portfolio',
			[],
			(error, result, fieleds) => {
				if(error) {
					this.isError(error, this.const.ERROR_CODE_OTHER, res);
					return;
				}
				else if(result.length == 0) {
					this.isError(error, this.const.ERROR_CODE_NOT_FOUND, res);
					return;
				}
				res.status(this.const.SUCCESS_CODE);
				res.send(result);
			}
		);
	}

	/**
	 * ポートフォリオ Post
	 * @param req 
	 * @param res 
	 */
	public post(req, res): void {

	}
}