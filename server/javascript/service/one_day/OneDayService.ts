// === Service ===
import { Service } from '../common/Service';

// === DaoManager ===
import { DBDaoCreater } from '../../daoCreater/db/DBDaoCreater';

// === Entity ===
import {OneDayEntity} from '../../entity/one_day/OneDayEntity';
import { SQLParams } from '../../entity/SQLParams';

/**
 * @class OneDayService
 * @extends Service
 */
export class OneDayService extends Service {

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
		this.logger.system.debug('OneDayService.get: start');
		let dao = this.daoCreater.getOneDayDao();
		dao.get(key, body, query,
			(result :OneDayEntity) => {
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
		this.logger.system.debug('OneDayService.query: start');
		let dao = this.daoCreater.getOneDayDao();
		dao.query(key, body, query,
			(result :Array<OneDayEntity>) => {
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
