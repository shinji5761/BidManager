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
	public get(req, res): void {
		this.dao.get(
			(data) => {
				data = this.service.createResultData(data);
				res.status(200).send(data);
			},
			(error, status) => {
				this.isError(error, status, res);
			},this
		);
	}
}