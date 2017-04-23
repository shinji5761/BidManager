import { Http, RequestOptions } from '@angular/http';

// === Provider ===
import { ApiService } from './api-service';

/**
 * @class PortfolioListApiiService
 * @extends ApiService
 */
export class PortfolioListApiService extends ApiService {

	/**
	 * @constructor
	 * @param  {Http}   http
	 * @param  {string} url API URL
	 */
	constructor(http :Http, url :string) {
		super(http, url);
	}


}
