// === Dao ===
import { Dao } from '../common/Dao';

// === Manager ===
import { OneDayManager } from '../../manager/one_day/OneDayManager';

export class OneDayDao extends Dao {

	/**
	 * @constructor
	 */
	constructor(connection) {
		super(connection, OneDayManager);
	}
}
