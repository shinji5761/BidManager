// === Manager ===
import { Manager } from '../common/Manager';

// === Entity ===
import { SQLParams} from '../../entity/SQLParams';

export class MarketInfoManager extends Manager {
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
					hour + ':' + min AS time,
					open,
					high,
					low,
					close,
					volume
				FROM
					market_info
				WHERE
					brand_code = ?
				AND
					target_date = (SELECT MAX(target_date) FROM market_info)
				ORDER BY
					target_date, hour, min
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
					hour,
					min,
					open,
					high,
					low,
					close,
					volume
				FROM
					market_info
				WHERE
					brand_code = ?
				AND
					target_date = (SELECT MAX(target_date) FROM market_info)
				ORDER BY
					target_date, hour, min
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
				INSERT INTO market_info
				(
					brand_code, target_date, hour, min, open, high, low, close, volume
				)
				VALUES
				(
					?, ?, ?, ?, ?, ?, ?, ?, ?
				)
				ON DUPLICATE KEY UPDATE
					open = ?,
					high = ?,
					low = ?,
					close = ?,
					volume = ?
				`,
				[
					key.brandCode, key.targetDate, key.hour, key.min, body.open, body.high, body.low, body.close, body.volume,
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
