//  === Controller ===
import { Controller } from '../common/Controller';

// === Dao ===
import { PortfolioListDao } from '../../dao/portfolio_list/PortfolioListDao';

// === Service ===
import { PortfolioListService } from '../../service/portfolio_list/PortfolioListService';


/**
 * @class PortfolioListController
 */
export class PortfolioListController extends Controller {

	constructor() {
		super('/portfolioList', PortfolioListDao, PortfolioListService);
	}
}
