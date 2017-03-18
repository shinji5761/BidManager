import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// === API Service ===
import { PortfolioApiService } from './PortfolioApiService';
import { PurchasesApiService } from './PurchasesApiService';

@Injectable()
export class ApiAccessor {

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

	/**
	 * PurchasesApiService 取得
	 * @return PurchasesApiService
	 */
	public getPurchasesApiService() :PurchasesApiService {
		return new PurchasesApiService(this._http, this.host + 'purchases/no/');
	}

}
