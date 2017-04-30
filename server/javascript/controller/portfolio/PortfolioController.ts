import { Controller } from '../common/Controller';

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
		super('/portfolio', PortfolioService);
	}
}
