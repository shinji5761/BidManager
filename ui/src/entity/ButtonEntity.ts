
/**
 * @class ButotnEntity
 */
export class ButtonEntity {
	/**
	 * ボタン名
	 * @private
	 * @type {string}
	 */
	private label :string;

	/**
	 * 色
	 * @private
	 * @type {string}
	 */
	private color :string;

	/**
	 * クリックイベントハンドラ
	 * @private
	 * @type {Function}
	 */
	private onClickEvent :Function;

	/**
	 * プレスイベントハンドラ
	 * @private
	 * @type {Function}
	 */
	private onPressEvent :Function;

	/**
	 * @constructor
	 * @param label 
	 * @param color 
	 * @param clickEvent 
	 * @param pressEvent 
	 */
	constructor(label :string, color :string, clickEvent :Function, pressEvent :Function) {
		this.label = label;
		this.color = color;
		this.onClickEvent = clickEvent;
		this.onPressEvent = pressEvent;
	}

}