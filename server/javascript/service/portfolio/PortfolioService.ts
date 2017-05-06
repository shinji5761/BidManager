// === Service ===
import { Service } from '../common/Service';

// === DaoCreater ===
import { DBDaoCreater } from '../../daoCreater/db/DBDaoCreater';

// === Entity ===
import {PortfolioEntity} from '../../entity/portfolio/PortfolioEntity';

/**
 * PortfolioService
 * @class
 * @extends Service
 */
export class PortfolioService extends Service {
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
		this.logger.system.debug('PortfolioService.get: start');
		let dao = this.daoCreater.getPortfolioDao();
		dao.get(key, body, query,
			(result :PortfolioEntity) => {
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
	public query(key :Object, body :Object, query :Object, onSuccess :Function, onFail :Function, caller :Object) :void {
		this.logger.system.debug('PortfolioService.query: start');
		let dao = this.daoCreater.getPortfolioDao();
		dao.query(key, body, query,
			(result :Array<PortfolioEntity>) => {
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
		this.logger.system.debug('PortfolioService.post: start');
		let connection = this.daoCreater.getConnection();
		connection.beginTransaction((tError) => {
			if(tError) {
				this.runRollback(connection, tError, DBDaoCreater.TRANSACTION_ERROR, onFail, caller);
			}
			// ポートフォリオ Post処理
			this.postPortfolio(connection, key, body, onSuccess, onFail, caller);
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
		this.logger.system.debug('PortfolioService.put: start');
		let connection = this.daoCreater.getConnection();
		connection.beginTransaction((tError) => {
			if(tError) {
				this.runRollback(connection, tError, DBDaoCreater.TRANSACTION_ERROR, onFail, caller);
			}
			// ポートフォリオ削除処理
			this.deletePortfolio(connection, key, body, onSuccess, onFail, caller);
		});	}
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
		this.logger.system.debug('PortfolioService.delete: start');
		let connection = this.daoCreater.getConnection();
		connection.beginTransaction((tError) => {
			if(tError) {
				this.runRollback(connection, tError, DBDaoCreater.TRANSACTION_ERROR, onFail, caller);
			}
			let dao = this.daoCreater.getPortfolioDao();
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

	/**
	 * ポートフォリオ 削除処理
	 * @param {Object}		connection
	 * @param {Object}		key
	 * @param {Object}		body
	 * @param {Function}	onSuccess	コールバック関数(OK)
	 * @param {Function}	onFail		コールバック関数(NG)
	 * @param {Object}		caller		呼び元
	 */
	private deletePortfolio(connection, key, body, onSuccess, onFail, caller) :void {
		this.logger.system.debug('PortfolioService.deletePortfolio: start');
		let dao = this.daoCreater.getPortfolioDao();
		dao.delete(key, body,
			(result) => {
				// ポートフォリオ Post処理
				this.postPortfolio(connection, key, body, onSuccess, onFail, caller);
			},
			(error, status) => {
				this.runRollback(connection, error, status, onFail, caller);
			},
			this
		);
	}

	/**
	 * ポートフォリオ 追加処理
	 * @param {Object}		connection
	 * @param {Object}		key
	 * @param {Object}		body
	 * @param {Function}	onSuccess	コールバック関数(OK)
	 * @param {Function}	onFail		コールバック関数(NG)
	 * @param {Object}		caller		呼び元
	 */
	private postPortfolio(connection, key, body, onSuccess, onFail, caller) :void {
		this.logger.system.debug('PortfolioService.postPortfolio: start');
		let dao = this.daoCreater.getPortfolioDao();
		dao.post(key, body,
			(result) => {
				// 追加したポートフォリオの番号
				this.logger.system.info("PortfolioService.postPortfolio: result=" + JSON.stringify(result));
				key.portfolioNo = result.insertId;
				// 銘柄ポスト処理
				this.postBrand(connection, key, body, onSuccess, onFail, caller);
			},
			(error, status) => {
				this.runRollback(connection, error, status, onFail, caller);
			},
			this
		);
	}

	/**
	 * 銘柄 追加処理
	 * @param {Object}		connection
	 * @param {Object}		key
	 * @param {Object}		body
	 * @param {Function}	onSuccess	コールバック関数(OK)
	 * @param {Function}	onFail		コールバック関数(NG)
	 * @param {Object}		caller		呼び元
	 */
	private postBrand(connection, key, body, onSuccess, onFail, caller) :void {
		this.logger.system.debug('PortfolioService.postBrand: start');
		let dao = this.daoCreater.getBrandDao();
		dao.posts(key, body,
			(result) => {
				this.runCommit(connection, result, onSuccess, onFail, caller);
			},
			(error, status) => {
				this.runRollback(connection, error, status, onFail, caller);
			},
			this
		);

	}



}
