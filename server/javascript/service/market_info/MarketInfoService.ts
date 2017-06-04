// === Service ===
import { Service } from '../common/Service';

// === DaoManager ===
import { DBDaoCreater } from '../../daoCreater/db/DBDaoCreater';

// === Entity ===
import {MarketInfoEntity} from '../../entity/market_info/MarketInfoEntity';
import { SQLParams } from '../../entity/SQLParams';

/**
 * @class MarketInfoService
 * @extends Service
 */
export class MarketInfoService extends Service {

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
		this.logger.system.debug('MarketInfoService.get: start');
		let dao = this.daoCreater.getMarketInfoDao();
		dao.get(key, body, query,
			(result :MarketInfoEntity) => {
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
		this.logger.system.debug('MarketInfoService.query: start');
		let dao = this.daoCreater.getMarketInfoDao();
		dao.query(key, body, query,
			(result :Array<MarketInfoEntity>) => {
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
