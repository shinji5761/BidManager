import { Http, RequestOptions } from '@angular/http';

// === Provider ===
import { ApiService } from './api-service';

/**
 * @class MarketInfoApiService
 * @extends ApiService
 */
export class MarketInfoApiService extends ApiService {

	/**
	 * 銘柄コード
	 * @private
	 * @type {number}
	 */
	private brandCode :number;

	/**
	 * 日付
	 * @type {string}
	 */
	private targetDate : string;

	/**
	 * @constructor
	 */
	constructor(http :Http, url :string) {
		super(http, url);
	}

	/**
	 * Get
	 * @override
	 * @return {any} [description]
	 */
	public query() :any {
		let url = this.url + this.brandCode;
		return this.http.get(url, {'search': this.option}).map(res => res.json());
	}

	/**
	 * Setter(brandCode)
	 * @param {number} brandCode 銘柄コード
	 */
	public setBrandCode(brandCode :number) :void {
		this.brandCode = brandCode;
	}


	/**
	 * Setter(targetDate)
	 * @param {string} targetDate 日付
	 */
	public setTargetDate(targetDate :string) :void {
		this.targetDate = targetDate;
	}

}
