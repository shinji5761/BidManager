import { Controller } from '../common/Controller';

// === Dao ===
import { BrandDao } from '../../dao/brand/BrandDao';

// === Service ===
import { BrandService } from '../../service/brand/BrandService';

/**
 * BrandController
 * @class
 * @extends Controller
 */
export class BrandController extends Controller {
	/**
	 * @constructor
	 */
	constructor() {
		super('/brand/code/:code', BrandDao, BrandService);
	}

	/**
	 *
	 * @param req
	 * @param res
	 */
	public get(req, res) :void {
		this.logger.system.debug('BrandController.get: start');

		let body = req.body;
		body['code'] = req.params.code;
		this.logger.system.info('BrandController.get: ' + JSON.stringify(body));

		this.dao.get(
			body,
			(data) => {
				this.afterGet(req, res, data);
			},
			(error, status) => {
				this.isError(error, status, res);
			}
		)
	}
}
