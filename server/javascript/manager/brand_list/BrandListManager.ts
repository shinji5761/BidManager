// === Manager ===
import { Manager } from '../common/Manager';

// === Entity ===
import { SQLParams } from '../../entity/SQLParams';

/**
 * @class BrandListManager
 * @extends Manager
 */
export class BrandListManager extends Manager {
	/**
	 * @constructor
	 */
	constructor() {
		super();
	}


		/**
		 * Portfolio Get Paramater
		 * @param {Object}	key
		 * @param {Object}	body
		 * @param {Object}	query
		 * @return {SQLParams}
		 */
		public createGetParams(key, body, query) :SQLParams {
			return new SQLParams(
				`
				`,
				[]
			);
		}

		/**
		 * Portfolio Query Parameter
		 * @param {Object}	key
		 * @param {Object}	body
		 * @param {Object}	query
		 * @return {SQLParams}
		 */
		public createQueryParams(key, body, query) :SQLParams {
			return new SQLParams(
				`
				SELECT
					brandCode
				FROM
					brand_list
				`,
				[]
			);
		}

		/**
		* Post Paramater
		* @param  {Object}    key  [description]
		* @param  {Object}    body [description]
		* @return {SQLParams}      [description]
		*/
		public createPostParams(key :Object, body :Object) :SQLParams {
			return new SQLParams(
				`
				`,
				[]
			);
		}


		/**
		 * Put Paramater
		 * @param  {Object}    key  [description]
		 * @param  {Object}    body [description]
		 * @return {SQLParams}      [description]
		 */
		public createPutParams(key :Object, body :Object) :SQLParams {
			return new SQLParams(
				`
				`,
				[]
			);
		}


		/**
		 * Delete Paramater
		 * @param  {Object}    key  [description]
		 * @param  {Object}    body [description]
		 * @return {SQLParams}      [description]
		 */
		public createDeleteParams(key :Object, body :Object) :SQLParams {
			return new SQLParams(
				`
				`,
				[]
			);
		}




}
