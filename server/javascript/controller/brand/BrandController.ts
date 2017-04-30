// === Controller ===
import { Controller } from '../common/Controller';

// === Service ===
import { BrandService } from '../../service/brand/BrandService';

/**
 * @class BrandController
 * @extends Controller
 */
export class BrandController extends Controller {

	/**
	 * @constructor
	 */
	constructor() {
		super('/brand', BrandService);
	}
}
