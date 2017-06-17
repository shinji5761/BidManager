// === Dao ===
import { Dao } from '../common/Dao';

// === Manager ===
import { MarketOneDayInfoManager } from '../../manager/market_one_day_info/MarketOneDayInfoManager';

export class MarketOneDayInfoDao extends Dao {

	/**
	 * @constructor
	 */
	constructor(connection) {
		super(connection, MarketOneDayInfoManager);
	}
}
