import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// === API Service ===
import { PortfolioApiService } from './PortfolioApiService';
import { BrandApiService } from './BrandApiService';
import { OneDayApiService } from './OneDayApiService';
import { MarketInfoApiService } from './MarketInfoApiService';
import { MarketOneDayInfoApiService } from './MarketOneDayInfoApiService';

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

	/**
	 * MarketInfoApiService 取得
	 * @return MarketInfoApiService
	 */
	public getMarketInfoApiService() :MarketInfoApiService {
		return new MarketInfoApiService(this._http, this.host + 'marketInfo/');
	}


	/**
	 * MarketOneDayInfoApiService 取得
	 * @return MarketInfoApiService
	 */
	public getMarketOneDayInfoApiService() : MarketOneDayInfoApiService {
		return new MarketOneDayInfoApiService(this._http, this.host + 'marketOneDayInfo/');
	}

}
