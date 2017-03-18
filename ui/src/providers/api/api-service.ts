import { Http,  URLSearchParams, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * ApiService
 * API取得サービス
 */
export class ApiService {

	/**
	 * URL
	 * @private
	 * @type {string}
	 */
	protected url :string;

	/**
	 * オプション
	 * @private 
	 * @type {URLSearchParams}
	 */
	protected option :URLSearchParams;

	/**
	 * ヘッダー
	 * @private 
	 * @type {Headers}
	 */
	protected headers: Headers;

	/**
	 * Http
	 */
	protected http :Http;

	/**
	 * @constructor
	 * @param {Http} http
	 * @param {string} url
	 */
	constructor(http, url) {
		this.url = url;
		this.http = http;
		this.option = new URLSearchParams();
		this.headers = new Headers();
		this.headers.append("Content-Type", 'application/json');

		// オプションの初期化
		this.clearOption();
	}


	/**
	 * Portfolio GET
	 * @return {any}
	 */
	public query() :any {
		return this.http.get(this.url, {'search': this.option}).map(res => res.json());
	}

	/**
	 * Portfolio POST
	 * @param {any} data POST Data
	 */
	public post(data :any) :any {
		let params = JSON.stringify(data);
		let options = new RequestOptions({headers: this.headers});
		console.log(params);
		return this.http.post(this.url, params, options).map(res => res.json());
	}

	/**
	 * Portfolio PUT
	 * @param {any} data PUT Data
	 */
	public update(data :any) :any {
		let params = JSON.stringify(data);
		let options = new RequestOptions({headers: this.headers});
		return this.http.post(this.url, params, options).map(res => res.json());
	}


	/**
	 * オプション設定
	 * @public
	 */
	public setOption(option: Object) {
		let keys = Object.keys(option);
		for(let index in keys) {
			this.option.set(keys[index], option[keys[index]]);
		}
	}

	/**
	 * オプション初期化
	 */
	public clearOption() :void {
		this.option = new URLSearchParams();
		this.option.set('callback', 'JSONP_CALLBACK');
	} 

}
