import { Dao } from '../common/Dao';

// === Service ===
import { BrandService } from '../../service/brand/BrandService';

/**
 * BrandDao
 * @class {BrandDao} BrandDao
 * @extends Dao
 */
export class BrandDao extends Dao {
	/**
	 * @constructor
	 */
	constructor() {
		super(BrandService);
	}
}
