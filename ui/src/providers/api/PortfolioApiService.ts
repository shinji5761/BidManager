import { Http, RequestOptions } from '@angular/http';

// === Provider ===
import { ApiService } from './api-service';

/**
 * PortfolioApiService
 * @class
 * @extends ApiService
 */
export class PortfolioApiService extends ApiService {

	/**
	 * ポートフォリオ番号
	 * @type {number}
	 */
	private portfolioNo :number;

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
	 * GET
	 * @return {any}
	 */
	public query() :any {
		let url = this.url + this.portfolioNo;
		return this.http.get(url, {'search': this.option}).map(res => res.json());
	}

	/**
	 * POST
	 * @param {any} data POST Data
	 */
	public post(data :any) :any {
		let url = this.url + this.portfolioNo;
		let params = JSON.stringify(data);
		let options = new RequestOptions({headers: this.headers});
		console.log(params);
		return this.http.post(url, params, options).map(res => res.json());
	}

	/**
	 * PUT
	 * @param {any} data PUT Data
	 */
	public update(data :any) :any {
		let url = this.url + this.portfolioNo;
		let params = JSON.stringify(data);
		let options = new RequestOptions({headers: this.headers});
		return this.http.put(url, params, options).map(res => res.json());
	}

	/**
	 * Delete
	 * @return {any}
	 */
	public delete() :any {
		let url = this.url + this.portfolioNo;
		let options = new RequestOptions({'headers': this.headers});
		return this.http.delete(url, options).map(res => res.json());
	}


	/**
	 * Setter(portfolioNo)
	 * @param {number} portfolioNo
	 */
	public setPortfolioNo(portfolioNo :number) :void {
		this.portfolioNo = portfolioNo;
	}
}
