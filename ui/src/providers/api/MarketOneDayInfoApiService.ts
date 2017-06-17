import { Http, RequestOptions } from '@angular/http';

// === Provider ===
import { ApiService } from './api-service';

/**
 * @class MarketOneDayInfoApiService
 * @extends ApiService
 */
export class MarketOneDayInfoApiService extends ApiService {

	/**
	 * 銘柄コード
	 * @private
	 * @type {number}
	 */
	private brandCode :number;

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
}
