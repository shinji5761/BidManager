import { Http } from '@angular/http';
import { ApiService } from './api-service';

/**
 * PurchasesApiService
 * @class
 * @extends ApiService
 */
export class PurchasesApiService extends ApiService {

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

}