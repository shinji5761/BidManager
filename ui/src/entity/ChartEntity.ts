import { ChartDatasetEntity } from './ChartDatasetEntity';

/**
 * @class ChartEntity
 */
export class ChartEntity {
	/**
	 * チャートタイプ
	 * @type {string}
	 */
	private type :string;

	/**
	 * ラベル
	 * @type {Array<string>}
	 */
	private labels :Array<string>;

	/**
	 * データセット
	 * @type {Array<ChartDatasetEntity>}
	 */
	private dataset :Array<ChartDatasetEntity>;

	/**
	 * オプション
	 * @type {Object}
	 */
	private options :Object;

	/**
	 * @constructor
	 */
	constructor(type :string, labels: Array<string>, dataset :Array<ChartDatasetEntity>, options :Object) {
		this.type = type;
		this.labels = labels;
		this.dataset = dataset;
		this.options = options;
	}

	/**
	 * Getter(type)
	 * @return {string}
	 */
	public getType() :string {
		return this.type;
	}

	/**
	 * Getter(labels)
	 * @return {Array<string>}
	 */
	public getLabels() :Array<string> {
		return this.labels;
	}

	/**
	 * Getter(dataset)
	 * @return {Array<ChartDatasetEntity>}
	 */
	public getDataset() :Array<ChartDatasetEntity> {
		return this.dataset;
	}

	/**
	 * Setter(labels)
	 */
	public setLabels(labels :Array<string>) :void {
		this.labels = labels;
	}

	/**
	 * Setter(dataset)
	 */
	public setDataset(dataset :Array<ChartDatasetEntity>) :void {
		this.dataset = dataset;
	}

}
