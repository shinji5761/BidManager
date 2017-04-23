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
	private brandCode :number;

	/**
	 * 銘柄名
	 * @private
	 * @type {string}
	 */
	private brandName :string;

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
	constructor(brandNo, brandCode, brandName, price, stock) {
		this.brandNo = brandNo;
		this.brandCode = brandCode;
		this.brandName = brandName;
		this.price = price;
		this.stock = stock;
	}


	/**
	 * Getter(code)
	 * @public
	 * @return {number} code
	 */
	public getBrandCode() :number {
		return this.brandCode;
	};

	/**
	 * Setter(brandNo)
	 * @param {number} brandNo 表示順序
	 */
	public setBrandNo(brandNo) :void {
		this.brandNo = brandNo;
	}

}
