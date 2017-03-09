import { Http,  URLSearchParams, Headers, RequestOptions } from '@angular/http';

// === Entity ===
import { PortfolioEntity } from '../../entity/PortfolioEntity';
import 'rxjs/add/operator/map';

export class PortfolioApiService {

	/**
	 * オプション
	 * @type {URLSearchParams}
	 */
	private option: URLSearchParams;

	private _headers: Headers;

	/**
	 * @constructor
	 * @param {Http} _http 
	 * @param {Jsonp} _jsonp
	 * @param {string} _url
	 */
	constructor(
		private _http: Http,
		private _url: string
	) {
		this._headers = new Headers();
		this._headers.append("Content-Type", 'application/json');

		// オプションの初期化
		this.clearOption();
	};

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
		return this._http.get(this._url, {'search': this.option}).map(res => res.json());
	}

	/**
	 * Portfolio POST
	 * @param {PortfolioEntity} data POST Data
	 */
	public post(data: PortfolioEntity) :any {
		var params = JSON.stringify(data);
		var options = new RequestOptions({headers: this._headers});
		return this._http.post(this._url, params, options).map(res => res.json());
	}
}