// === Manager ===
import { Manager } from '../common/Manager';

// === Entity ===
import { SQLParams } from '../../entity/SQLParams';

export class PortfolioManager extends Manager {

	constructor() {
		super();
	}

	/**
	 * Portfolio Get Paramater
	 * @param {Object}	key
	 * @param {Object}	body
	 * @param {Object}	query
	 * @return {SQLParams}
	 */
	public createGetParams(key, body, query) :SQLParams {
		return new SQLParams(
			`
			SELECT
				portfolio_no AS portfolioNo,
				portfolio_name AS portfolioName
			FROM
				portfolio
			WHERE
				portfolio_no = ?
			`,
			[key.portfolioNo]
		);
	}

	/**
	 * Portfolio Query Parameter
	 * @param {Object}	key
	 * @param {Object}	body
	 * @param {Object}	query
	 * @return {SQLParams}
	 */
	public createQueryParams(key, body, query) :SQLParams {
		return new SQLParams(
			`
			SELECT
				portfolio_no AS portfolioNo,
				portfolio_name AS portfolioName
			FROM
				portfolio
			`,
			[]
		);
	}

	/**
	* Post Paramater
	* @param  {Object}    key  [description]
	* @param  {Object}    body [description]
	* @return {SQLParams}      [description]
	*/
	public createPostParams(key :Object, body :Object) :SQLParams {
		let item = {'portfolio_name': body.portfolioName};
		if(key.portfolioNo) {
			item['portfolio_no'] = key.portfolioNo;
		}
		return new SQLParams(
			`
			INSERT INTO
				portfolio SET ?
			`,
			[item]
		);
	}


	/**
	 * Put Paramater
	 * @param  {Object}    key  [description]
	 * @param  {Object}    body [description]
	 * @return {SQLParams}      [description]
	 */
	public createPutParams(key :Object, body :Object) :SQLParams {
		return new SQLParams(
			`
			SELECT
				portfolio_no AS portfolioNo,
				portfolio_name AS portfolioName
			FROM
				portfolio
			`,
			[]
		);
	}


	/**
	 * Delete Paramater
	 * @param  {Object}    key  [description]
	 * @param  {Object}    body [description]
	 * @return {SQLParams}      [description]
	 */
	public createDeleteParams(key :Object, body :Object) :SQLParams {
		return new SQLParams(
			`
			DELETE
			FROM
				portfolio
			WHERE portfolio_no = ?
			`,
			[key.portfolioNo]
		);
	}

}
