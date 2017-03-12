
/**
 * Service
 * @class
 */
export class Service {
	/**
	 * @public
	 * @param {any} data 加工対象のデータ
	 * @return {any} 加工データ
	 */
	public createResultData(data :any) :void {
		// 加工しない場合はそのままリターン
		// 加工する場合はオーバーライド
		return data;
	}

}