import { Controller } from '../common/Controller';

// === Dao ===
import { PortfolioDao } from '../../dao/portfolio/PortfolioDao';

// === Service ===
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
		super('/portfolio/portfolioNo/:portfolioNo', PortfolioDao, PortfolioService);
	}

	/**
	 * リクエストボディ 加工処理
	 * @param body
	 * @param req
	 */
	protected createBody(body, req) :void {
		body['portfolioNo'] = req.params.portfolioNo;
	}

}
