// === Logger ===
import logger = require('../../../LogSettings');

// === Dao ===
import { DBDaoCreater } from '../../daoCreater/db/DBDaoCreater';

/**
 * Service
 * @class Service
 * @abstract
 */
export abstract class Service {
	/**
	 * ログ
	 * @type {any}
	 */
	protected logger :any;

	/**
	 * Dao
	 * @private
	 * @type {DBDaoCreater}
	 */
	protected daoCreater :DBDaoCreater;

	/**
	 * @constructor
	 */
	constructor() {
		this.logger = logger;
		this.daoCreater = new DBDaoCreater();
	}

	/**
	 * Get
	 * @public
	 * @param {Object}		key
	 * @param {Object}		body
	 * @param {Object}		query
	 * @param {Function}	onSuccess	コールバック関数(OK)
	 * @param {Function}	onFail		コールバック関数(NG)
	 * @param {Object}		caller		呼び元
	 */
	public abstract get(key :Object, body :Object, query :Object, onSuccess :Function, onFail :Function, caller :Object) :void;

	/**
	 * Query
	 * @public
	 * @param {Object}		key
	 * @param {Object}		body
	 * @param {Object}		query
	 * @param {Function}	onSuccess	コールバック関数(OK)
	 * @param {Function}	onFail		コールバック関数(NG)
	 * @param {Object}		caller		呼び元
	 */
	public abstract query(key :Object, body :Object, query :Object, onSuccess :Function, onFail :Function, caller :Object) :void;

	/**
	 * Post
	 * @public
	 * @param {Object}		key
	 * @param {Object}		body
	 * @param {Function}	onSuccess	コールバック関数(OK)
	 * @param {Function}	onFail		コールバック関数(NG)
	 * @param {Object}		caller		呼び元
	 */
	public abstract post(key :Object, body :Object, onSuccess :Function, onFail :Function, caller :Object) :void;


	/**
	 * Put
	 * @public
	 * @param {Object}		key
	 * @param {Object}		body
	 * @param {Function}	onSuccess	コールバック関数(OK)
	 * @param {Function}	onFail		コールバック関数(NG)
	 * @param {Object}		caller		呼び元
	 */
	public abstract put(key :Object, body :Object, onSuccess :Function, onFail :Function, caller :Object) :void;

	/**
	 * Delete
	 * @public
	 * @param {Object}		key
	 * @param {Object}		body
	 * @param {Function}	onSuccess	コールバック関数(OK)
	 * @param {Function}	onFail		コールバック関数(NG)
	 * @param {Object}		caller		呼び元
	 */
	public abstract delete(key :Object, body :Object, onSuccess :Function, onFail :Function, caller :Object) :void;

	/**
	 * コミット実行
	 * 成功 : onSuccess
	 * 失敗 : onFail
	 * @param {any}      data     [description]
	 * @param {Function} onSuccess [description]
	 * @param {Function} onFail   [description]
	 * @param {Object}   caller   [description]
	 */
	protected runCommit(connection, data :any, onSuccess :Function, onFail :Function, caller :Object) :void {
		// コミット
		connection.commit((error) => {
			if(error) {
				// ロールバック
				this.runRollback(connection, error, 500, onFail, caller);
				onFail.call(caller, error);
			}
			this.logger.system.debug("Dao.runCommit : 結果にコミットしました｡")
			onSuccess.call(caller, data);
		});
	}

	/**
	 * [runRollback description]
	 * @param  {any}      error  [description]
	 * @param  {number}   code   [description]
	 * @param  {Function} onFail [description]
	 * @param  {Object}   caller [description]
	 * @return {[type]}          [description]
	 */
	protected runRollback(connection, error :any, code :number, onFail :Function, caller :Object) {
		// ロールバック
		connection.rollback(() => {
			onFail.call(caller, error, code);
		})
	}
}
