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
	private no: number;

	/**
	 * ポートフォリオ名
	 * @private
	 * @type {string}
	 */
	private name: string;

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
	 * @param {number} id
	 * @param {string} name
	 * @param {number} profit
	 * @param {Array<BrandEntity>}
	 */
	constructor(no: number, name: string, profit: number, brand) {
		this.no = no;
		this.name = name;
		this.profit = profit;
		this.brand = brand;
	}


	/** Setter */
	public setNo(no :number) :void {
		this.no = no;
	}

	public setName(name :string) :void {
		this.name = name;
	}

	public setProfit(profit :number) :void {
		this.profit = profit;
	}

	public setBrand(brand :Array<BrandEntity>) :void {
		this.brand = brand;
	}

	/** Getter */
	public getNo() :number {
		return this.no;
	}

	public getName() :string {
		return this.name;
	}

	public getProfit() :number {
		return this.profit;
	}

	public getBrand() :Array<BrandEntity> {
		return this.brand;
	}

}