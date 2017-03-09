import { Component } from '@angular/core'

/**
 * @class {MenuEntity} メニュークラス
 */
export class MenuEntity {
	/**
	 * メニュー名
	 * @type {string}
	 */
	private name: string;

	/**
	 * ページオブジェクト
	 * @type {Component}
	 */
	private page: Component;

	/**
	 * @constructor
	 * @param {string} name メニュー名
	 * @param {Component} page ページオブジェクト
	 */
	constructor(name: string, page: Component) {
		this.name = name;
		this.page = page;
	}

	// === Setter ===
	setName(name: string) :void {
		this.name = name;
	}
	setPage(page: Component) :void {
		this.page = page;
	}
	// === Getter ===
	getName() :string {
		return this.name;
	}
	getPage() :Component {
		return this.page;
	}
}