// === Service ===
import { Service } from '../common/Service';

// === DaoManager ===
import { DBDaoCreater } from '../../daoCreater/db/DBDaoCreater';

// === Entity ===
import { MarketOneDayInfoEntity } from '../../entity/market_one_day_info/MarketOneDayInfoEntity';
import { SQLParams } from '../../entity/SQLParams';

/**
 * @class MarketOneDayInfoService
 * @extends Service
 */
export class MarketOneDayInfoService extends Service {

	/**
	 * @constructor
	 */
	constructor() {
		super();
	}

	/**
	 * Get
	 * @param {[type]} key       [description]
	 * @param {[type]} body      [description]
	 * @param {[type]} query     [description]
	 * @param {[type]} onSuccess [description]
	 * @param {[type]} onFail    [description]
	 * @param {[type]} caller    [description]
	 */
	public get(key, body, query, onSuccess, onFail, caller) :void {
		this.logger.system.debug('MarketOneDayInfoEntity.get: start');
		let dao = this.daoCreater.getMarketOneDayInfoDao();
		dao.get(key, body, query,
			(result :MarketOneDayInfoEntity) => {
				onSuccess.call(caller, result);
			},
			(error, status) => {
				onFail.call(caller, error, status);
			},
			this
		);
	}

	/**
	 * Query
	 * @param {[type]} key       [description]
	 * @param {[type]} body      [description]
	 * @param {[type]} query     [description]
	 * @param {[type]} onSuccess [description]
	 * @param {[type]} onFail    [description]
	 * @param {[type]} caller    [description]
	 */
	public query(key, body, query, onSuccess, onFail, caller) :void {
		this.logger.system.debug('MarketOneDayInfoEntity.query: start');
		let dao = this.daoCreater.getMarketOneDayInfoDao();
		dao.query(key, body, query,
			(result :Array<MarketOneDayInfoEntity>) => {
				onSuccess.call(caller, result);
			},
			(error, status) => {
				onFail.call(caller, error, status);
			},
			this
		);
	}


	public post(){};
	public put(){};
	public delete(){};

}
