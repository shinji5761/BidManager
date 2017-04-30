// === Manager ===
import { Manager } from '../common/Manager';

// === Entity ===
import { SQLParams} from '../../entity/SQLParams';

export class OneDayManager extends Manager {
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
					one_day
				WHERE
					brand_code = ?
				ORDER BY
					target_date
				LIMIT ?
				`,
				[key.brandCode, Number(query.limit)]
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
					one_day
				WHERE
					brand_code = ?
				ORDER BY
					target_date
				LIMIT ?
				`,
				[key.brandCode, Number(query.limit)]
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
				INSERT INTO one_day
				(
					brand_code, target_date, open, high, low, close, volume
				)
				VALUES
				(
					?, ?, ?, ?, ?, ?, ?
				)
				ON DUPLICATE KEY UPDATE
					open = ?,
					high = ?,
					low = ?,
					close = ?,
					volume = ?
				`,
				[
					key.brandCode, key.targetDate, body.open, body.high, body.low, body.close, body.volume,
					body.open, body.high, body.low, body.close, body.volume
				]
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
