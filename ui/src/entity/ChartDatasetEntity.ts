/**
 * @class ChartDatasetEntity
 */
export class ChartDatasetEntity {
	/**
	 * データ
	 * @private
	 * @type {Array<number>}
	 */
	private data :Array<number>;

	/**
	 * ラベル
	 * @private
	 * @type {string}
	 */
	private label :string;

	/**
	 * @constructor
	 */
	constructor(data :Array<number>, label :string) {
		this.data = data;
		this.label = label;
	}

	/**
	 * Getter(data)
	 * @return {Array<number>} data
	 */
	public getData() :Array<number> {
		return this.data;
	}

	/**
	 * Getter(label)
	 * @return {string} data
	 */
	public getLabel() :string {
		return this.label;
	}

	/**
	 * Setter(data)
	 * @public
	 * @param {Array<number>} data data
	 */
	public setData(data :Array<number>) :void {
		this.data = data;
	}

	/**
	 * Setter(label)
	 * @public
	 * @param {string} label ラベル名
	 */
	public setLabel(label :string) :void {
		this.label = label;
	}

}