/**
 * SelectTermEntity
 * @class
 */
export class SelectTermEntity {
	/**
	 * 表示名
	 */
	private name : string;

	/**
	 * 値
	 */
	private value : string;

	/**
	 * @constructor
	 * @param  {string} name  表示名
	 * @param  {string} value 値
	 */
	constructor( name : string, value : string ) {
		this.name = name;
		this.value = value;
	}

	/**
	 * Getter(name)
	 */
	public getName() : string {
		return this.name;
	};

	/**
	 * Getter(value)
	 */
	public getValue() : string {
		return this.value;
	};
}
