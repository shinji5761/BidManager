// === Service ===
import { Service } from '../common/Service';

// === Entity ===
import { SQLParams } from '../../entity/SQLParams';


/**
 * PortfolioService
 * @class
 * @extends Service
 */
export class PortfolioService extends Service {

	/**
	 * @constructor
	 */
	constructor() {
		super();
	}


	/**
	 * 検索データ作成処理
	 * @override
	 * @public
	 * @param {any} body リクエストボディ
	 * @return {SQLParams} SQL実行パラメータ
	 */
	public createGetParams(body :any) :SQLParams {
		this.logger.system.debug('PortfolioService.createGetParams: start');
		let portfolioNo :number = body.portfolioNo;			// ポートフォリオ番号
		let params = new SQLParams(
			'SELECT portfolio_no AS portfolioNo, portfolio_name AS portfolioName, brand_code AS brandCode, brand_name AS brandName, price, stock FROM portfolio WHERE portfolio_no = ? ORDER BY brand_code',
			[portfolioNo]
		);
		return params;
	}

	/**
	 * 作成データ作成処理
	 * @override
	 * @public
	 * @param {any} body リクエストボディ
	 * @return {SQLParams} SQL実行パラメータ
	 */
	public createPostParams(body :any) :SQLParams {
		this.logger.system.debug('PortfolioService.createPostParams: start');
		let portfolioNo :number = body.portfolioNo;			// ポートフォリオ番号
		let portfolioName :string = body.portfolioName;		// ポートフォリオ名
		let brand :Array<any> = body.brand;					// 銘柄情報
		let sql = 'INSERT INTO portfolio VALUES(?, ?, ?, ?, ?, ?)';	// SQL
		let data : Array<any>;
		if(brand.length > 0) {
			data = [portfolioNo, portfolioName, brand[0]['brandCode'], brand[0]['brandName'], brand[0]['price'], brand[0]['stock']]; // 一つ目のデータ
			// 2つ目以降のデータがある場合
			for(let index = 1; index < body.length; index++) {
				sql += ', (?, ?, ?, ?, ?)';
				data.push(portfolioNo);
				data.push(portfolioName);
				data.push(brand[index]['brandCode']);
				data.push(brand[index]['brandName']);
				data.push(brand[index]['price']);
				data.push(brand[index]['stock']);
			}
		}

		let params = new SQLParams(
			sql, data
		);
		return params;
	}

	/**
	 * 更新データ作成処理
	 * @override
	 * @public
	 * @param {any} body リクエストボディ
	 * @return {SQLParams} SQL実行パラメータ
	 */
	public createPutParams(body :any) :SQLParams {
		this.logger.system.debug('PortfolioService.createPutParams: start');
		let portfolioNo :number = body.portfolioNo;			// ポートフォリオ番号
		let deleteSql = 'DELETE FROM portfolio WHERE portfolio_no = ?';	// SQL
		let insertParam = this.createPostParams(body);
		insertParam['data'].unshift(portfolioNo);

		let params = new SQLParams(
			deleteSql + ';' + insertParam['sql'],
			insertParam['data']
		);
		return params;
	}


	/**
	 * 削除データ作成処理
	 * @override
	 * @public
	 * @param {any} body リクエストボディ
	 * @return {SQLParams} SQL実行パラメータ
	 */
	public createDeleteParams(body :any) :SQLParams {
		this.logger.system.debug('PortfolioService.createPutParams: start');
		let portfolioNo :number = body.portfolioNo;			// ポートフォリオ番号
		let deleteSql = 'DELETE FROM portfolio WHERE portfolio_no = ?';	// SQL

		let params = new SQLParams(
			deleteSql,
			[portfolioNo]
		);
		return params;
	}
}
