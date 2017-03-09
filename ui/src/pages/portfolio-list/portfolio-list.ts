import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


// === Entity ===
import { PortfolioEntity } from '../../entity/PortfolioEntity';

// === API ===
import { ApiService } from '../../providers/api/api-service';
import { PortfolioApiService } from '../../providers/api/PortfolioApiService';

@Component({
	selector: 'page-portfolio-list',
	templateUrl: 'portfolio-list.html'
})
export class PortfolioListPage implements OnInit {

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
		public _api: ApiService
	) {}

	/**
	 * 初期化
	 * @return {void}
	 */
	ngOnInit() :void {
		// APIの取得
		this.api = this._api.getPortfolioApiService();
		this.runGetPortfolio();
	}

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
		// ポートフォィオの設定
		for(let index in result) {
			this.portfolioList.push(new PortfolioEntity(result[index].no, result[index].name, result[index].profit));
		}
	}

	/**
	 * ポートフォリオ追加
	 * @return {void}
	 */
	public addPortfolio() :void {
		alert('addPortfolio');
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
		// alert('showPortfolio');
	}

	/**
	 * ポートフォリオ 色設定
	 * @param {PortfolioEntity} portfolio 対象のポートフォリオ
	 * @return {string} 色
	 */
	public settingsColor(portfolio: PortfolioEntity) :string {
		return portfolio.getProfit() > 0 ? 'primary' : 'danger';
	}
}
