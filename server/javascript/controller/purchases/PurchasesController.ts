import { Controller } from '../common/Controller';

// === Dao ===
import { PurchasesDao } from '../../dao/purchases/PurchasesDao';

// === Service ===
import { PurchasesService } from '../../service/purchases/PurchasesService';

/**
 * PurchasesController
 * @class
 * @extends Controller
 */
export class PurchasesController extends Controller {

	/**
	 * @constructor
	 */
	constructor() {
		super('/purchases/no/:no', PurchasesDao, PurchasesService);
	}

	/**
	 * 購入物 Get
	 * @override
	 * @param req
	 * @param res
	 */
	public get(req, res) :void {
		this.logger.system.debug('PurchasesController.get: start');

		let body = req.body;
		body['no'] = req.params.no;
		this.logger.system.info('PurchasesController.get: ' + JSON.stringify(body));

		this.dao.get(
			body,
			(data) => {
				this.afterGet(req, res, data);
			},
			(error, status) => {
				this.isError(error, status, res);
			}
		);
	}

	/**
	 * 購入物 Post
	 * @override
	 * @param req
	 * @param res
	 */
	public post(req, res) :void {
		this.logger.system.debug('PurchasesController.post: start');

		let body = req.body;
		body['no'] = req.params.no;
		this.logger.system.info('PurchasesController.post: ' + JSON.stringify(body));

		this.dao.post(
			body,
			(data) => {
				this.afterPost(req, res, data);
			},
			(error, status) => {
				this.isError(error, status, res);
			}, this
		);
	}
}
