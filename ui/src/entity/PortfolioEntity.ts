import { BrandEntity } from './BrandEntity';

/**
 * PortfolioEntity
 * @class
 */
export class PortfolioEntity {
	/**
	 * ポートフォリオID
	 * @private
	 * @type {number}
	 */
	private portfolioNo: number;

	/**
	 * ポートフォリオ名
	 * @private
	 * @type {string}
	 */
	private portfolioName: string;

	/**
	 * 損益
	 * @private
	 * @type {number}
	 */
	private profit: number;

	/**
	 * 銘柄一覧
	 * @type {Array<BrandEntity>}
	 */
	private brand :Array<BrandEntity>;

	/**
	 * @constructor
	 * @param {number} brandNo
	 * @param {string} name
	 * @param {number} profit
	 * @param {Array<BrandEntity>}
	 */
	constructor(portfolioNo: number, portfolioName: string, profit: number, brand) {
		this.portfolioNo = portfolioNo;
		this.portfolioName = portfolioName;
		this.profit = profit;
		this.brand = brand;
	}


	/** Setter */
	public setNo(portfolioNo :number) :void {
		this.portfolioNo = portfolioNo;
	}

	public setName(portfolioName :string) :void {
		this.portfolioName = portfolioName;
	}

	public setProfit(profit :number) :void {
		this.profit = profit;
	}

	public setBrand(brand :Array<BrandEntity>) :void {
		this.brand = brand;
	}

	/** Getter */
	public getPortfolioNo() :number {
		return this.portfolioNo;
	}

	public getPortfolioName() :string {
		return this.portfolioName;
	}

	public getProfit() :number {
		return this.profit;
	}

	public getBrand() :Array<BrandEntity> {
		return this.brand;
	}

}
