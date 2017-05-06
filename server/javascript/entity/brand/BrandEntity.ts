
/**
 * @class BrandEntity
 */
export class BrandEntity {
	/**
	 * 銘柄番号
	 * @private
	 * @type {number}
	 */
	private brandNo :number;

	/**
	 * ポートフォリオ番号
	 * @private
	 * @type {number}
	 */
	private portfolioNo :number;

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
	 * 価格
	 * @private
	 * @type {number}
	 */
	private price :number;

	/**
	 * 保有数
	 * @private
	 * @type {number}
	 */
	private stock :number;

	/**
	 * @constructor
	 */
	constructor(brandNo, portfolioNo, brandCode, brandName, price, stock){
		this.brandNo = brandNo;
		this.portfolioNo = portfolioNo;
		this.brandCode = brandCode;
		this.brandName = brandName;
		this.price = price;
		this.stock = stock;
	};
}
