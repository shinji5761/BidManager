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
	 * @constructor
	 * @param {number} id
	 * @param {string} name
	 * @param {number} profit
	 */
	constructor(id: number, name: string, profit: number) {
		this.id = id;
		this.name = name;
		this.profit = profit;
	};


	/** Setter */
	public setId(id:number) :void {
		this.id = id;
	}

	public setName(name: string) :void {
		this.name = name;
	}

	public setProfit(profit: number) :void {
		this.profit = profit;
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

}