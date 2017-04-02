import { Service } from '../common/Service';

/**
 * BrandService
 * @class`
 * @extends Service
 */
export class BrandService extends Service {
	/**
	 * @constructor
	 */
	constructor() {
		super();
	}

	/**
	 *
	 * @param body
	 */
	public createGetParams(body :any) :any {
		this.logger.system.debug('BrandService.createGetParams: start');
		let param = {
			'sql': 'SELECT code, DATE_FORMAT(targetDate, \'%y/%m/%d\') AS date, open, high, low, close, volume FROM one_day WHERE code = ? ORDER BY  targetDate ASC LIMIT 90',
			'data': [Number(body.code)]
		};
		return param;
	}

}
