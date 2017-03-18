/**
 * ToastOptionEntity
 * @class
 */
export class ToastOptionEntity {

	/**
	 * オプション
	 * @private
	 * @type {Object}
	 */
	private option :Object = {};

	/**
	 * @constructor
	 * @param {string} message
	 * @param {number} duration
	 */
	constructor(message :string, duration :number) {
		this.option['message'] = message;
		this.option['duration'] = duration;
	}

	/**
	 * Getter(option)
	 * @public
	 * @return {Object}
	 */
	public getOption() :Object {
		return this.option;
	}

}
