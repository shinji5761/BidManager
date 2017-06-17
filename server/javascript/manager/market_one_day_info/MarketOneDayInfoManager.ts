// === Manager ===
import { Manager } from '../common/Manager';

// === Entity ===
import { SQLParams} from '../../entity/SQLParams';

export class MarketOneDayInfoManager extends Manager {
	/**
	 * @constructor
	 */
	constructor() {
		super();
	}


		/**
		 * Brand Get Paramater
		 * @param  {[type]}    key   [description]
		 * @param  {[type]}    body  [description]
		 * @param  {[type]}    query [description]
		 * @return {SQLParams}       [description]
		 */
		public createGetParams(key, body, query) :SQLParams {
			return new SQLParams(
				`
				SELECT
					brand_code AS brandCode,
					DATE_FORMAT(target_date, \'%y/%m/%d\') AS targetDate,
					open,
					high,
					low,
					close,
					volume
				FROM
					market_one_day_info
				WHERE
					brand_code = ?
				ORDER BY
					target_date
				LIMIT 90
				`,
				[key.brandCode]
			);
		}

		/**
		 * Brand Query Parameter
		 * @param  {[type]}    key  [description]
		 * @param  {[type]}    body [description]
		 * @return {SQLParams}      [description]
		 */
		public createQueryParams(key, body, query) :SQLParams {
			return new SQLParams(
				`
				SELECT
					brand_code AS brandCode,
					DATE_FORMAT(target_date, \'%y/%m/%d\') AS targetDate,
					open,
					high,
					low,
					close,
					volume
				FROM
					market_one_day_info
				WHERE
					brand_code = ?
				ORDER BY
					target_date
				LIMIT 90
				`,
				[key.brandCode]
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
		};

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
