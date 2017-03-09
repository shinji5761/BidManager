import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';


// === Page ===
import { HomePage } from '../pages/home/home';
import { PortfolioListPage } from '../pages/portfolio-list/portfolio-list';

// === Entity ===
import { MenuEntity } from '../entity/MenuEntity';


@Component({
	templateUrl: 'app.html'
})
export class MyApp implements OnInit {
	/**
	 * コンテンツ
	 * @type {NavController}
	 */
	@ViewChild('mycontent') content: NavController;

	/**
	 * メニューリスト
	 * @type {Array<MenuEntity>}
	 */
	menuList: Array<MenuEntity> = [];


	/**
	 * @constructor
	 * @param {Pratform} platform 
	 * @param {MenuController} _menuCtrl 
	 */
	constructor(
		platform: Platform,
		private _menuCtrl: MenuController) {
		platform.ready().then(() => {
		// Okay, so the platform is ready and our plugins are available.
		// Here you can do any higher level native things you might need.
		StatusBar.styleDefault();
		Splashscreen.hide();
		});
	}


	/**
	 * 初期化処理
	 * @return {void}
	 */
	ngOnInit() :void {
		// ルートの設定
		this.content.setRoot(HomePage);
		this.menuList.push(new MenuEntity('HOME', HomePage));
		this.menuList.push(new MenuEntity('ポートフォリオ', PortfolioListPage));
	}


	/**
	 * ページ切り替え
	 * @param {Component} page 遷移先のページオブジェクト
	 * @return {void}
	 */
	changePage(page: Component): void {
		this.content.push(page);
		this._menuCtrl.close();
	}

}
