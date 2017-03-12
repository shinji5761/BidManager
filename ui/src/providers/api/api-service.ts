import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// === API Service ===
import { PortfolioApiService } from './PortfolioApiService';

/**
 * ApiService
 * API取得サービス
 */
@Injectable()
export class ApiService {
	/**
	 * URL(http://････)
	 * @type {string}
	 */
	public host: string = 'http://192.168.33.101:18456/'

	constructor(
		private _http: Http
	) {
		console.log('Hello ApiService Provider');
	}

	/**
	 * PortfolioApiService 取得
	 * @return PortfolioApiService
	 */
	public getPortfolioApiService() :PortfolioApiService {
		return new PortfolioApiService(this._http, this.host + 'portfolio');
	}

}