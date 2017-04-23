// === Dao ===
import { Dao } from '../common/Dao';

// === Service ===
import { PortfolioListService } from '../../service/portfolio_list/PortfolioListService';

/**
 * @class PortfolioListDao
 * @extends Dao
 */
export class PortfolioListDao extends Dao {

	/**
	 * @constructor
	 */
	constructor() {
		super(PortfolioListService);
	}
}
