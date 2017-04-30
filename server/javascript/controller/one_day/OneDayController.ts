// === Controller ===
import { Controller } from '../common/Controller';

// === Service ===
import { OneDayService } from '../../service/one_day/OneDayService';

/**
 * @class OneDayController
 * @extends Controller
 */
export class OneDayController extends Controller {
	/**
	 * @constructor
	 */
	constructor() {
		super('/oneDay', OneDayService);
	}
}
