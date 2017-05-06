
/**
 * 1日足
 * @class
 */
export class OneDayEntity {
	/**
	 * 銘柄コード
	 * @private 
	 * @type {number}
	 */
	private brandCode :number;

	/**
	 * 対象日
	 * @private 
	 * @type {Date}
	 */
	private targetDate :Date;

	/**
	 * 始値
	 * @private 
	 * @type {number}
	 */
	private open :number;

	/**
	 * 高値
	 * @private 
	 * @type {number}
	 */
	private high :number;

	/**
	 * 安値
	 * @private 
	 * @type {number}
	 */
	private low :number;

	/**
	 * 終値
	 * @private 
	 * @type {number}
	 */
	private close :number;

	/**
	 * 出来高
	 * @private 
	 * @type {number}
	 */
	private volume :number;
	
	/**
	 * @constructor
	 */
	constructor(brandCode :number, targetDate :Date, open :number, high :number, low :number, close :number, volume :number) {
		this.brandCode = brandCode;
		this.targetDate = targetDate;
		this.open = open;
		this.low = low;
		this.close = close;
		this.volume = volume;
	}
}
