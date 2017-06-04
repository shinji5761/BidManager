// === Dao ===
import { Dao } from '../common/Dao';

// === Manager ===
import { MarketInfoManager } from '../../manager/market_info/MarketInfoManager';

export class MarketInfoDao extends Dao {

	/**
	 * @constructor
	 */
	constructor(connection) {
		super(connection, MarketInfoManager);
	}
}
