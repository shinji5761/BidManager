
/**
 * ポートフォリオ クラス
 * @class
 */
export class Portfolio {
	/**
	 * ナンバー
	 * @private
	 * @type {number}
	 */
	private no :number;

	/**
	 * 名前
	 * @private 
	 * @type {string}
	 */
	private name :string;

	/**
	 * 損益
	 * @private 
	 * @type {number}
	 */
	 private profit :number;

	/**
	 * @constructor
	 * @param {number} no  
	 * @param {string} name 
	 * @param {number} profit 
	 */
	constructor(no :number, name :string, profit :number) {
		this.no = no;
		this.name = name;
		this.profit = profit;
	  }

}