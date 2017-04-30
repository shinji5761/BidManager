// === Angular ===
import { Http, RequestOptions } from '@angular/http';

// === APIService ===
import { ApiService } from './api-service';


export class BrandApiService extends ApiService {

	/**
	 * @constructor
	 */
	constructor(http :Http, url :string) {
		super(http, url);
	};
}
