// === Manager ===
import { Manager } from '../common/Manager';

// === Entity ===
import { SQLParams } from '../../entity/SQLParams';

export class BrandManager extends Manager {

	constructor() {
		super();
	}

	/**
	 * Brand Get Paramater
	 * @param  {[type]}    key  [description]
	 * @param  {[type]}    body [description]
	 * @param  {[type]}    query [description]
	 * @return {SQLParams}      [description]
	 */
	public createGetParams(key, body, query) :SQLParams {
		return new SQLParams(
			`
			`,
			[]
		);
	}

	/**
	 * Brand Query Parameter
	 * @param  {[type]}    key  [description]
	 * @param  {[type]}    body [description]
	 * @param  {[type]}    query [description]
	 * @return {SQLParams}      [description]
	 */
	public createQueryParams(key, body, query) :SQLParams {
		return new SQLParams(
			`
			SELECT
				brand_no AS brandNo,
				brand_code AS brandCode,
				brand_name AS brandName,
				price,
				stock,
				market_price AS marketPrice
			FROM
				brand_view
			WHERE
				portfolio_no = ?
			ORDER BY
				brand_no
			`,
			[query.portfolioNo]
		);
	}

	/**
	* Post Paramater
	* @param  {Object}    key  [description]
	* @param  {Object}    body [description]
	* @return {SQLParams}      [description]
	*/
	public createPostParams(key :Object, body :Object) :SQLParams {
		return new SQLParams(
			`
			`,
			[]
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
			`,
			[]
		);
	}

	/**
	 * 銘柄 追加処理
	 * ポートフォリオサービスから呼ばれる前提のメソッド
	 * @param  {Object}    key
	 * @param  {Object}    brand
	 * @return {SQLParams}
	 */
	public createPostsParams(key :Object, brandList :Array<Object>) :SQLParams {
		let values = {'sql': '', 'value': []};
		for(let index in brandList) {
			(index == '0') ? values['sql'] += '(?,?,?,?,?,?)' : values['sql'] += ',(?,?,?,?,?,?)';
			values['value'].push(key.portfolioNo);
			values['value'].push(brandList[index].brandNo);
			values['value'].push(brandList[index].brandCode);
			values['value'].push(brandList[index].brandName);
			values['value'].push(brandList[index].price);
			values['value'].push(brandList[index].stock);

		}

		return new SQLParams(
			`
			INSERT INTO brand(
				portfolio_no,
				brand_no,
				brand_code,
				brand_name,
				price,
				stock
			)
			VALUES
			` + values['sql'],
			values['value']
		);
	}


}
