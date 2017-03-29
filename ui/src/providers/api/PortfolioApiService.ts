import { Http, RequestOptions } from '@angular/http';
import { ApiService } from './api-service';

/**
 * PortfolioApiService
 * @class
 * @extends ApiService
 */
export class PortfolioApiService extends ApiService {

	/**
	 * ポートフォリオナンバー
	 * @type {number}
	 */
	private no :number;

	/**
	 * @constructor
	 * @param {Http} http
	 * @param {string} url
	 */
	constructor(
		http: Http,
		url: string
	) {
		super(http, url);
	}

	/**
	 * Delete
	 * @return {any}
	 */
	public delete() :any {
		let url = this.url + 'no/' + this.no;
		let options = new RequestOptions({'headers': this.headers});
		return this.http.delete(url, options).map(res => res.json());
	}


	/**
	 * Setter(no)
	 * @param {number} no
	 */
	public setNo(no :number) :void {
		this.no = no;
	}
}
