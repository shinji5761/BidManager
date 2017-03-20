import { Controller } from '../common/Controller';
import { PortfolioDao } from '../../dao/portfolio/PortfolioDao';
import { PortfolioService } from '../../service/portfolio/PortfolioService';

/**
 * PortfolioController
 * @class
 * @extends Controller
 */
export class PortfolioController extends Controller {

	/**
	 * @constructor
	 */
	constructor() {
		super('/portfolio', PortfolioDao, PortfolioService);
	}

	/**
	 * ポートフォリオ Get
	 * @param req 
	 * @param res 
	 */
	public get(req, res) :void {
		let sql = 'SELECT * FROM portfolio';
		let params = [];
		this.dao.get(
			sql, params,
			// コールバック(OK)
			(data) => {
				data = this.service.createResultData(data);
				res.status(200).send(data);
			},
			// コールバック(NG)
			(error, status) => {
				this.isError(error, status, res);
			},this
		);
	}

	/**
	 * ポートフォリオ POST
	 * @param req 
	 * @param res 
	 */
	public post(req, res) :void {
		let sql :string = 'INSERT INTO portfolio SET ?';
		let params :Object = {
			'name': req.body.name
		};
		this.dao.post(
			sql, params,
			(data) => {
				res.status(200).send(data);
			},
			(error, status) => {
				this.isError(error, status, res);
			}
		);
	}

	/**
	 * ポートフォリオ PUT
	 * @param req
	 * @param res
	 */
	public put(req, res) :void {

	}

	/**
	 * 
	 * @param req ポートフォリオ 
	 * @param res 
	 */
	public afterPut(req, res) :void {

	}

}