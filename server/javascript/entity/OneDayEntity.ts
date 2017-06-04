
/**
 * 1日足
 */
export class OneDayEntity {
	/**
	 * 銘柄コード
	 * @type {number}
	 */
	private brandCode :number;

	/**
	 * 日付
	 * @type {Date}
	 */
	private targetDate :Date;

	/**
	 * 始値
	 * @type {number}
	 */
	private open :number;

	/**
	 * 高値
	 * @type {number}
	 */
	private high :number;

	/**
	 * 安値
	 * @type {number}
	 */
	private low :number;

	/**
	 * 終値
	 * @type {number}
	 */
	private close :number;

	/**
	 * 出来高
	 * @type {number}
	 */
	private volume :number;

	/**
	 * @constructor
	 * @param  {number} code	   [description]
	 * @param  {Date} targetDate [description]
	 * @param  {number} open	   [description]
	 * @param  {number} high	   [description]
	 * @param  {number} low		[description]
	 * @param  {number} close	  [description]
	 * @param  {number} volume	 [description]
	 */
	constructor(brandCode, targetDate, open, high, low, close, volume) {
		this.brandCode = brandCode;
		this.targetDate = targetDate;
		this.open = open;
		this.high = high;
		this.low = low;
		this.close = close;
		this.volume = volume;
	}

	/**
	 * Getter(code)
	 * @return {number}
	 */
	public getBrandCode() :number {
		return this.brandCode;
	}

	/**
	 * Getter(targetDate)
	 * @return {Date} targetDate
	 */
	public getTargetDate() :Date {
		return this.targetDate;
	}

	/**
	 * Getter(open)
	 * @return {open}
	 */
	public getOpen() :number {
		return this.open;
	}

	/**
	 * Getter(high)
	 * @return {high}
	 */
	public getHigh() :number {
		return this.high;
	}

	/**
	 * Getter(low)
	 * @return {low}
	 */
	public getLow() :number {
		return this.low;
	}

	/**
	 * Getter(close)
	 * @return {close}
	 */
	public getClose() :number {
		return this.close;
	}

	/**
	 * Getter(volume)
	 * @return {volume}
	 */
	public getVolume() :number {
		return this.volume;
	}
}
