// === DaoCreater ===
import { DaoCreater } from '../common/DaoCreater';

// === Dao ===
import { PortfolioDao } from '../../dao/portfolio/PortfolioDAO';
import { BrandDao } from '../../dao/brand/BrandDao';
import { BrandListDao } from '../../dao/brand_list/BrandListDao';
import { OneDayDao } from '../../dao/one_day/OneDayDao';
import { MarketInfoDao } from '../../dao/market_info/MarketInfoDao';

// === mysql ===
import mysql = require('mysql');


export class DBDaoCreater implements DaoCreater {
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
	 * MySQLコネクション
	 * @protected
	 */
	private connection;

	/**
	 * トランザクションエラー
	 */
	public static TRANSACTION_ERROR :number = 303;


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
	}


	/**
	 * PortfolioDao 取得
	 * @return {PortfolioDao}
	 */
	public getPortfolioDao() :PortfolioDao {
		return new PortfolioDao(this.connection);
	}

	/**
	 * BrandDao 取得
	 * @return {BrandDao}
	 */
	public getBrandDao() :BrandDao {
		return new BrandDao(this.connection);
	}

	/**
	 * BrandListDao 取得
	 * @return {BrandListDao}
	 */
	public getBrandListDao() :BrandListDao {
		return new BrandListDao(this.connection);
	}

	/**
	 * OneDayDao 取得
	 * @return {OneDayDao}
	 */
	public getOneDayDao() :OneDayDao {
		return new OneDayDao(this.connection);
	}

	/**
	 * MarketInfoDao 取得
	 * @return {MarketInfoDao}
	 */
	public getMarketInfoDao() : MarketInfoDao {
		return new MarketInfoDao(this.connection);
	}


	/**
	 * Getter(connection)
	 * @return {any} [description]
	 */
	public getConnection() :any {
		return this.connection;
	}
}
