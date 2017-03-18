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
	 * @param req 
	 * @param res 
	 */
	public get(req, res) :void {
		let sql = 'SELECT code, name, price, stock FROM purchases WHERE no = ? ORDER BY code'
		let no = req.params.no;
		let params = [no];

		this.dao.get(
			sql, params,
			(data) => {
				data = this.service.createResultData(data);
				res.status(200).send(data);
			},
			(error, status) => {
				this.isError(error, status, res);
			},this
		);
	}

	/**
	 * 購入物 Post
	 * @param req 
	 * @param res 
	 */
	public post(req, res) :void {
		let sql = 'SELECT func_create_purchases(?, ?, ?, ?)';
		let no = req.params.no;
		let brand = req.body;
		let params = [Number(no), Number(brand.code), brand.price, brand.stock];
		this.dao.post(
			sql, params,
			function(data) {
				res.status(200).send(data);
			},
			function(error, status) {
				this.isError(error, status, res);
			}, this
		);
	}
}