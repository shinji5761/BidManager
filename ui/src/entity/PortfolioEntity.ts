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
	private id: number;

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
	constructor(id: number, name: string, profit: number, brand) {
		this.id = id;
		this.name = name;
		this.profit = profit;
		this.brand = brand;
	}


	/** Setter */
	public setId(id :number) :void {
		this.id = id;
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
	public getId() :number {
		return this.id;
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