// === Controller ===
import { Controller } from '../common/Controller';

// === Service ===
import { MarketOneDayInfoService } from '../../service/market_one_day_info/MarketOneDayInfoService';

/**
 * @class MarketOneDayInfoController
 * @extends Controller
 */
export class MarketOneDayInfoController extends Controller {
	/**
	 * @constructor
	 */
	constructor() {
		super('/marketOneDayInfo', MarketOneDayInfoService);
	}
}
