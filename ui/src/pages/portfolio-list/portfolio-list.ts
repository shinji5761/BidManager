import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

// === Page ===
import { PortfolioPage } from '../portfolio/portfolio';

// === Dialog ===
import { EditPortfolioDialogPage } from '../edit-portfolio-dialog/edit-portfolio-dialog';

// === Entity ===
import { PortfolioEntity } from '../../entity/PortfolioEntity';
import { BrandEntity } from '../../entity/BrandEntity';

// === API ===
import { ApiAccessor } from '../../providers/api/api-accessor';
import { PortfolioApiService } from '../../providers/api/PortfolioApiService';

@Component({
	selector: 'page-portfolio-list',
	templateUrl: 'portfolio-list.html'
})
export class PortfolioListPage implements OnInit {

	/**
	 * タイトル
	 * @private 
	 * @type {string}
	 */
	private title :string = 'ポートフォリオ';

	/**
	 * ポートフォリオリスト
	 * @type {Array<PortfolioEntity>}
	 */
	private portfolioList: Array<PortfolioEntity> = [];

	/**
	 * API Service
	 * @type {PortfolioApiService}
	 */
	private api: PortfolioApiService;

	/**
	 * @constructor
	 * @param {NavController} _navCtrl 
	 * @param {NavParams} _navParams 
	 */
	constructor(
		public _navCtrl: NavController,
		public _navParams: NavParams,
		public _modalCtrl: ModalController,
		public _lodingCtrl: LoadingController,
		public _accessor: ApiAccessor
	) {
		// APIの取得
		this.api = this._accessor.getPortfolioApiService();
	}

	/**
	 * 初期化
	 * @return {void}
	 */
	ngOnInit() :void {
		this.runGetPortfolio();
	}

	/**
	 * ポートフォリオ 取得処理
	 * @return {void}
	 */
	public runGetPortfolio() :void {
		// ポートフォリオの取得
		this.api.query().subscribe(
			res => this.createPortfolio(res),
			error => console.error(error)
		);
	}

	/**
	 * ポートフォリオ 作成処理
	 * @param {Array<Object>} result api取得結果
	 */
	public createPortfolio(result) :void {
		// ポートフォリオの設定(Brandは空)
		for(let index in result) {
			this.portfolioList.push(new PortfolioEntity(result[index].no, result[index].name, result[index].profit, new Array<BrandEntity>()));
		}
	}

	/**
	 * ポートフォリオ追加
	 * @return {void}
	 */
	public addPortfolio() :void {
		// パラメータの設定
		let portfolio = new PortfolioEntity(null, '', 0, new Array<BrandEntity>());
		let title = 'ポートフォリオの追加';
		let inputData = {'portfolio': portfolio, 'title': title};

		// ダイアログの設定
		let modal = this._modalCtrl.create(EditPortfolioDialogPage, inputData);

		// ダイアログ終了イベントの設定
		modal.onDidDismiss((data) => {
			// ポートフォリオを初期化
			this.ngOnInit();
		});

		// Dialog展開
		modal.present();
	}

	/**
	 * ポートフォリオ削除
	 * @param {PortfolioEntity} portfolio 削除対象のポートフォリオ
	 */
	public deletePortfolio(portfolio: PortfolioEntity) :void {
		alert('deletePortfolio');

	}
	
	/**
	 * ポートフォリオ表示
	 * @param {PortfolioEntity} portfolio 削除対象のポートフォリオ
	 */
	public showPortfolio(portfolio: PortfolioEntity) :void {
		console.log('showPortfolio');
		let inputData = {'portfolio': portfolio};
		this._navCtrl.push(PortfolioPage, inputData);
	}

	/**
	 * ポートフォリオ 色設定
	 * @param {PortfolioEntity} portfolio 対象のポートフォリオ
	 * @return {string} 色
	 */
	public settingsColor(portfolio: PortfolioEntity) :string {
		return portfolio.getProfit() > 0 ? 'up' : 'down';
	}
}
