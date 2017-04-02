// === Dao ===
import { Dao } from '../common/Dao';

// === Service ===,
import { OneDayService } from '../../service/one_day/OneDayService';

export class OneDayDao extends Dao {

    constructor() {
        super(OneDayService);
    }
}
