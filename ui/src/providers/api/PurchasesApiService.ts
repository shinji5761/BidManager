import { Http, RequestOptions } from '@angular/http';
import { ApiService } from './api-service';

/**
 * PurchasesApiService
 * @class
 * @extends ApiService
 */
export class PurchasesApiService extends ApiService {

	/**
	 * ポートフォリオナンバー
	 * @private
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
	};

	/**
	 * Portfolio GET
	 * @override 
	 * @return {any}
	 */
	public query() :any {
		let url = this.url + this.no;
		return this.http.get(url, {'search': this.option}).map(res => res.json());
	}

	/**
	 * Portfolio POST
	 * @override 
	 * @return {any}
	 */
	public post(data) :any {
		let url = this.url + this.no;
		let params = JSON.stringify(data);
		let options = new RequestOptions({headers: this.headers});
		console.log(params);
		return this.http.post(url, params, options).map(res => res.json());
	}
	

	/**
	 * Setter(no)
	 * @public
	 * @param {number} no ポートフォリオナンバー
	 */
	public setNo(no :number) :void{
		this.no = no;
	}


}