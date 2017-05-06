
/**
 * ポートフォリオ クラス
 * @class
 */
export class PortfolioEntity {
	/**
	 * ポートフォィオ番号
	 * @private
	 * @type {number}
	 */
	private portfolioNo :number;

	/**
	 * ポートフォィオ名
	 * @private
	 * @type {string}
	 */
	private portfolioName :string;

	/**
	 * @constructor
	 * @param {number} portfolioNo
	 * @param {string} name
	 */
	constructor(portfolioNo :number, portfolioName :string) {
		this.portfolioNo = portfolioNo;
		this.portfolioName = portfolioName;
	  }

}
