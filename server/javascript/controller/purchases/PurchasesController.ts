import { Controller } from '../common/Controller';
import { PurchasesDao } from '../../dao/purchases/PurchasesDao';
import { PurchasesService } from '../../service/purchases/PurchasesService';

import url = require('url');

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
		let body = req.body;
		body['no'] = req.params.no;
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
		let body = req.body;
		body['no'] = req.params.no;
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