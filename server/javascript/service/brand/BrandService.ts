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
		let param = {
			'sql': 'SELECT code, DATE_FORMAT(targetDate, \'%Y年%m月%d日\') AS date, open, high, low, close, volume FROM one_day WHERE code = ? ORDER BY  targetDate DESC LIMIT 90',
			'data': [Number(body.code)]
		};
		return param;
	}

}