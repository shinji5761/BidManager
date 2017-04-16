/**
 * BrandEntity
 * @class
 */
export class BrandEntity {

	/**
	 * 表示順序
	 * @type {number}
	 */
	private brandNo :number;

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
	constructor(brandNo, code, name, price, stock) {
		this.brandNo = brandNo;
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
	};

	/**
	 * Setter(brandNo)
	 * @param {number} brandNo 表示順序
	 */
	public setBrandNo(brandNo) :void {
		this.brandNo = brandNo;
	}

}
