
/**
 * @class SQLParams
 */
export class SQLParams {

	/**
	 * SQL実行文
	 * @private
	 * @type {string}
	 */
	private sql :string;

	/**
	 * SQL実行時データ
	 * @private
	 * @type {any}
	 */
	private data :any;

	/**
	 * @constructor
	 * @param  {string} sql  SQL文
	 * @param  {any}    data クエリデータ
	 */
	constructor(sql :string, data :any) {
		this.sql = sql;
		this.data = data;
	}

	/**
	 * Getter(sql)
	 * @return {string} SQL実行文
	 */
	public getSQL() :string {
		return this.sql;
	}

	/**
	 * Getter(sql)
	 * @return {string} SQL実行文
	 */
	public getData() :any {
		return this.data;
	};
}
