import { Http } from '@angular/http';
import { ApiService } from './api-service';

/**
 * BrandApiService
 * @class
 * @extends ApiService
 */
export class BrandApiService extends ApiService {

	/**
	 * 銘柄コード
	 * @private 
	 * @type number
	 */
	private code :number;

	/**
	 * @constructor
	 */
	constructor(
		http :Http,
		url :string
	) {
		super(http, url);
	}

	/**
	 * Brand QUERY
	 * @public 
	 * @return {any}
	 */
	public query() :any {
		let url = this.url + this.code;
		return this.http.get(url, {'search': this.option}).map(res => res.json());
	}


	/**
	 * @public
	 * @param {number} code 銘柄コード
	 */
	public setCode(code :number) :void {
		this.code = code;
	}

}