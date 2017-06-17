
/**
 * 1日足
 */
export class MarketOneDayInfoEntity {
	/**
	 * 銘柄コード
	 * @type {number}
	 */
	private brandCode : number;

	/**
	 * 日付
	 * @type {number}
	 */
	private targetDate : Date;

	/**
	 * 始値
	 * @type {number}
	 */
	private open : number;

	/**
	 * 高値
	 * @type {number}
	 */
	private high : number;

	/**
	 * 安値
	 * @type {number}
	 */
	private low : number;

	/**
	 * 終値
	 * @type {number}
	 */
	private close : number;

	/**
	 * 出来高
	 * @type {number}
	 */
	private volume :number;


	/**
	 * @param  {number} brandCode	銘柄コード
	 * @param  {Date}   targetDate	日付
	 * @param  {number} open		始値
	 * @param  {number} high		高値
	 * @param  {number} low			安値
	 * @param  {number} close		終値
	 * @param  {number} volume		出来高
	 */
	constructor(
		brandCode	: number,
		targetDate	: Date,
		open		: number,
		high		: number,
		low			: number,
		close		: number,
		volume		: number
	) {
		this.brandCode = brandCode;
		this.targetDate = targetDate;
		this.open = open;
		this.high = high;
		this.low = low;
		this.close = close;
		this.volume = volume;
	};

	/**
	 * Getter(brandCode)
	 * @public
	 * @return {number}
	 */
	public getBrandCode() : number {
		return this.brandCode;
	};

	/**
	 * Getter(targetDate)
	 * @public
	 * @return {number}
	 */
	public getTargetDate() : Date {
		return this.targetDate;
	};

	/**
	 * Getter(open)
	 * @return {open}
	 */
	public getOpen() :number {
		return this.open;
	};

	/**
	 * Getter(high)
	 * @return {high}
	 */
	public getHigh() :number {
		return this.high;
	};

	/**
	 * Getter(low)
	 * @return {low}
	 */
	public getLow() :number {
		return this.low;
	};

	/**
	 * Getter(close)
	 * @return {close}
	 */
	public getClose() :number {
		return this.close;
	};

	/**
	 * Getter(volume)
	 * @return {volume}
	 */
	public getVolume() :number {
		return this.volume;
	};
}
