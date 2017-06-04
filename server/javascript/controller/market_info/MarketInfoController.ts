// === Controller ===
import { Controller } from '../common/Controller';

// === Service ===
import { MarketInfoService } from '../../service/market_info/MarketInfoService';

/**
 * @class OneDayController
 * @extends Controller
 */
export class MarketInfoController extends Controller {
	/**
	 * @constructor
	 */
	constructor() {
		super('/marketInfo', MarketInfoService);
	}
}
