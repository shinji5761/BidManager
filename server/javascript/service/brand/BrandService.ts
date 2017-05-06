// === Service ===
import { Service } from '../common/Service';

// === DaoCreater ===
import { DBDaoCreater } from '../../daoCreater/db/DBDaoCreater';

// === Entity ===
import {BrandEntity} from '../../entity/brand/BrandEntity';

/**
 * @class BrandService
 * @extends Service
 */
export class BrandService extends Service {

	/**
	 * @constructor
	 */
	constructor() {
		super();
	}
	/**
	 * Get
	 * @public
	 * @param {Object}		key
	 * @param {Object}		body
	 * @param {Function}	onSuccess	コールバック関数(OK)
	 * @param {Function}	onFail		コールバック関数(NG)
	 * @param {Object}		caller		呼び元
	 */
	public get(key :Object, body :Object, query :Object, onSuccess :Function, onFail :Function, caller :Object) :void {
		this.logger.system.debug('BrandService.get: start');
		let dao = this.daoCreater.getBrandDao();
		dao.get(key, body, query,
			(result :BrandEntity) => {
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
	 * @param {Object}   key       [description]
	 * @param {Object}   body      [description]
	 * @param {Function} onSuccess [description]
	 * @param {Function} onFail    [description]
	 * @param {Object}   caller    [description]
	 */
	public query(key :Object, body :Object, query :Object,onSuccess :Function, onFail :Function, caller :Object) :void {
		this.logger.system.debug('BrandService.query: start');
		let dao = this.daoCreater.getBrandDao();
		dao.query(key, body, query, 
			(result :Array<BrandEntity>) => {
				onSuccess.call(caller, result);
			},
			(error, status) => {
				onFail.call(caller, error, status);
			},
			this
		);
	}

	/**
	 * Post
	 * @public
	 * @param {Object}		key
	 * @param {Object}		body
	 * @param {Function}	onSuccess	コールバック関数(OK)
	 * @param {Function}	onFail		コールバック関数(NG)
	 * @param {Object}		caller		呼び元
	 */
	public post(key :Object, body :Object, onSuccess :Function, onFail :Function, caller :Object) :void {
		this.logger.system.debug('BrandService.post: start');
		let connection = this.daoCreater.getConnection();
		connection.beginTransaction((tError) => {
			if(tError) {
				this.runRollback(connection, tError, DBDaoCreater.TRANSACTION_ERROR, onFail, caller);
			}
			let dao = this.daoCreater.getBrandDao();
			dao.post(key, body,
				(result) => {
					this.runCommit(connection, result, onSuccess, onFail, caller);
				},
				(error, status) => {
					this.runRollback(connection, error, status, onFail, caller);
				},
				this
			);
		});
	}

	/**
	 * Put
	 * @public
	 * @param {Object}		key
	 * @param {Object}		body
	 * @param {Function}	onSuccess	コールバック関数(OK)
	 * @param {Function}	onFail		コールバック関数(NG)
	 * @param {Object}		caller		呼び元
	 */
	public put(key :Object, body :Object, onSuccess :Function, onFail :Function, caller :Object) :void {
		this.logger.system.debug('BrandService.put: start');
		let connection = this.daoCreater.getConnection();
		connection.beginTransaction((tError) => {
			if(tError) {
				this.runRollback(connection, tError, DBDaoCreater.TRANSACTION_ERROR, onFail, caller);
			}
			let dao = this.daoCreater.getBrandDao();
			dao.put(key, body,
				(result) => {
					this.runCommit(connection, result, onSuccess, onFail, caller);
				},
				(error, status) => {
					this.runRollback(connection, error, status, onFail, caller);
				},
				this
			);
		});
	}
	/**
	 * Delete
	 * @public
	 * @param {Object}		key
	 * @param {Object}		body
	 * @param {Function}	onSuccess	コールバック関数(OK)
	 * @param {Function}	onFail		コールバック関数(NG)
	 * @param {Object}		caller		呼び元
	 */
	public delete(key :Object, body :Object, onSuccess :Function, onFail :Function, caller :Object) :void {
		this.logger.system.debug('BrandService.delete: start');
		let connection = this.daoCreater.getConnection();
		connection.beginTransaction((tError) => {
			if(tError) {
				this.runRollback(connection, tError, DBDaoCreater.TRANSACTION_ERROR, onFail, caller);
			}
			let dao = this.daoCreater.getBrandDao();
			dao.delete(key, body,
				(result) => {
					this.runCommit(connection, result, onSuccess, onFail, caller);
				},
				(error, status) => {
					this.runRollback(connection, error, status, onFail, caller);
				},
				this
			);
		});
	}
}
