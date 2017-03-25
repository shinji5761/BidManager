import { Http } from '@angular/http';
import { ApiService } from './api-service';

/**
 * PortfolioApiService
 * @class
 * @extends ApiService
 */
export class PortfolioApiService extends ApiService {

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
}