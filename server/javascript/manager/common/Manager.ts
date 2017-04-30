import { SQLParams } from '../../entity/SQLParams';

/**
 * @class Manager
 */
export abstract class Manager {
	constructor() {};

	/**
	 * Get Paramater
	 * @abstract
	 * @param {Object}	key
	 * @param {Object}	body
	 * @param {Object}	query
	 * @return {SQLParams}
	 */
	public abstract createGetParams(key :Object, body :Object, query :Object) :SQLParams;


	/**
	* Query Paramater
	* @abstract
	* @param {Object}	key
	* @param {Object}	body
	* @param {Object}	query
	* @return {SQLParams}
	*/
	public abstract createQueryParams(key :Object, body :Object, query :Object) :SQLParams;


	/**
	* Post Paramater
	* @abstract
	* @param  {Object}    key  [description]
	* @param  {Object}    body [description]
	* @return {SQLParams}      [description]
	*/
	public abstract createPostParams(key :Object, body :Object) :SQLParams;


	/**
	 * Put Paramater
	 * @abstract
	 * @param  {Object}    key  [description]
	 * @param  {Object}    body [description]
	 * @return {SQLParams}      [description]
	 */
	public abstract createPutParams(key :Object, body :Object) :SQLParams;


	/**
	 * Delete Paramater
	 * @abstract
	 * @param  {Object}    key  [description]
	 * @param  {Object}    body [description]
	 * @return {SQLParams}      [description]
	 */
	public abstract createDeleteParams(key :Object, body :Object) :SQLParams;

}
