// === Dao ===
import { Dao } from '../common/Dao';

// === Service ===
import { BrandListService } from '../../service/brand_list/BrandListService';

/**
 * @class BrandListDao
 * @extends Dao
 */
export class BrandListDao extends Dao {

    /**
     * @constructor
     */
    constructor() {
        super(BrandListService);
    }
}
