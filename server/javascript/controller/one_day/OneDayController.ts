// === Controller ===
import { Controller } from '../common/Controller';

// === Dao ===
import { OneDayDao } from '../../dao/one_day/OneDayDao';

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
		super('/oneDay/brandCode/:brandCode', OneDayDao, OneDayService);
	}

	/**
	 * リクエストボディ 加工処理
	 * @param body
	 * @param req
	 */
	protected createBody(body, req) :void {
		body['brandCode'] = req.params.brandCode;
	}

}
