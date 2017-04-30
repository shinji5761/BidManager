// === Dao ===
import { Dao } from '../common/Dao';

// === Manager ===
import { BrandListManager } from '../../manager/brand_list/BrandListManager';

/**
 * @class BrandListDao
 * @extends Dao
 */
export class BrandListDao extends Dao {

	/**
	 * @constructor
	 */
	constructor(connection) {
		super(connection, BrandListManager);
	}
}
