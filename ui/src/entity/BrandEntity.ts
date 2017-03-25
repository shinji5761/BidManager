/**
 * BrandEntity
 * @class
 */
export class BrandEntity {
	/**
	 * 銘柄コード
	 * @private
	 * @type {number}
	 */
	private code :number;

	/**
	 * 銘柄名
	 * @private 
	 * @type {string}
	 */
	private name :string;

	/**
	 * 購入額
	 * @private 
	 * @type {number}
	 */
	private price :number;

	/**
	 * 保有株
	 * @type {number}
	 */
	private stock :number;


	/**
	 * @constructor
	 * @param {number} code
	 * @param {string} name
	 * @param {number} price
	 * @param {number} stock
	 */
	constructor(code, name, price, stock) {
		this.code = code;
		this.name = name;
		this.price = price;
		this.stock = stock;
	}


	/**
	 * Getter(code)
	 * @public 
	 * @return {number} code
	 */
	public getCode() :number {
		return this.code;
	}
	
}