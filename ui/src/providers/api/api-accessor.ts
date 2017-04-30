import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// === API Service ===
import { PortfolioApiService } from './PortfolioApiService';
import { BrandApiService } from './BrandApiService';
import { OneDayApiService } from './OneDayApiService';

@Injectable()
export class ApiAccessor {

	/**
	 * URL(http://････)
	 * @type {string}
	 */
	 public host: string = 'http://192.168.33.101:18456/'
	//  public host: string = 'http://163.58.164.6:18456/'

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
		return new PortfolioApiService(this._http, this.host + 'portfolio/');
	}

	/**
	 * BrandApiService 取得
	 * @return {BrandApiService} [description]
	 */
	public getBrandApiService() :BrandApiService {
		return new BrandApiService(this._http, this.host + 'brand/')
	}

	/**
	 * OneDayApiService 取得
	 * @return OneDayApiService
	 */
	public getOneDayApiService() :OneDayApiService {
		return new OneDayApiService(this._http, this.host + 'oneDay/');
	}

}
