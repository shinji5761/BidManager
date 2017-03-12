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
	protected _headers: Headers;


	/**
	 * Http
	 */
	protected _http :Http;

	/**
	 * @constructor
	 * @param {Http} http
	 * @param {string} url
	 */
	constructor(http, url) {
		this.url = url;
		this.option = new URLSearchParams();
		this._http = http;

		this._headers = new Headers();
		this._headers.append("Content-Type", 'application/json');

		// オプションの初期化
		this.clearOption();
	}

	/**
	 * オプション初期化
	 */
	public clearOption() :void {
		this.option = new URLSearchParams();
		this.option.set('callback', 'JSONP_CALLBACK');
	} 

	/**
	 * オプション設定
	 * @public
	 */
	public setOption(option: Object) {
		var keys = Object.keys(option);
		for(let index in keys) {
			this.option.set(keys[index], option[keys[index]]);
		}
	}


	/**
	 * Portfolio GET
	 * @return {any}
	 */
	public query() :any {
		return this._http.get(this.url, {'search': this.option}).map(res => res.json());
	}

	/**
	 * Portfolio POST
	 * @param {any} data POST Data
	 */
	public post(data: any) :any {
		var params = JSON.stringify(data);
		var options = new RequestOptions({headers: this._headers});
		return this._http.post(this.url, params, options).map(res => res.json());
	}
}
