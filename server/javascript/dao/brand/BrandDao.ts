/**
 * @fileoverview BrandDao.ts
 * @author shinji5761@gmail.com
 */

// === Dao ===
import { Dao } from '../common/Dao';

// === Manager ===
import { BrandManager } from '../../manager/brand/BrandManager';

// === Entity ===
import { SQLParams } from '../../entity/SQLParams';

/**
 * @class BrandDao
 */
export class BrandDao extends Dao {

	/**
	 * @constructor
	 */
	constructor(connection){
		super(connection, BrandManager);
	};

	/**
	 * Posts
	 * @param {Object}		key			[description]
	 * @param {Object}		body		[description]
	 * @param {Function}	onSuccess	[description]
	 * @param {Function}	onFail		[description]
	 * @param {Object}		caller		[description]
	 */
	public posts(key, body, onSuccess, onFail, caller) :void {
		let brandList :Array<any> = body.brand;
		let params :SQLParams = this.manager.createPostsParams(key, brandList);

		let query = this.connection.query(params.getSQL(), params.getData());
		let data;
		this.logger.system.info('BrandDao.post: params=' + params.getSQL() + ', data=' + JSON.stringify(params.getData()));
		this.logger.system.info('BrandDao.post: SQL=' + query.sql);
		query
		.on('error', (error) => {
			onFail.call(caller, error, this.const.ERROR_CODE_OTHER);
		})
		.on('result', (result) => {
			data = result;
		})
		.on('end', (result) => {
			onSuccess.call(caller, data);
		});
	}
}
