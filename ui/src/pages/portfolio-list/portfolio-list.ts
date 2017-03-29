import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, ToastController, AlertController } from 'ionic-angular';

// === Page ===
import { PortfolioPage } from '../portfolio/portfolio';

// === Dialog ===
import { EditPortfolioDialogPage } from '../edit-portfolio-dialog/edit-portfolio-dialog';

// === Entity ===
import { PortfolioEntity } from '../../entity/PortfolioEntity';
import { BrandEntity } from '../../entity/BrandEntity';
import { ToastOptionEntity } from '../../entity/ToastOptionEntity';

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
		private _navCtrl :NavController,
		private _navParams :NavParams,
		private _modalCtrl :ModalController,
		private _lodingCtrl :LoadingController,
		private _toastCtrl :ToastController,
		private _alertCtrl :AlertController,
		private _accessor :ApiAccessor
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
			error => this.onFailGet(error)
		);
	}

	/**
	 * ポートフォリオ 削除処理
	 * @private
	 * @param {number} no 選択したポートフォリオのNo
	 * @return {void}
	 */
	private runDeletePortfolio(no :number) :void {
		// ポートフォリオの削除
		this.api.setNo(no);
		this.api.delete().subscribe(
			res => this.onSuccessDelete(res),
			error => this.onFailDelete(error)
		);
	}

	/**
	 * ポートフォリオ 作成処理
	 * @param {Array<Object>} result api取得結果
	 */
	public createPortfolio(result) :void {
		// ポートフォリオリストの初期化
		this.portfolioList = [];

		// ポートフォリオの設定(Brandは空)
		for(let index in result) {
			this.portfolioList.push(new PortfolioEntity(result[index].no, result[index].name, result[index].profit, new Array<BrandEntity>()));
		}
	}

	/**
	 * ポートフォリオ 取得エラー
	 * @param {any} error [description]
	 */
	public onFailGet(error :any) :void {
		let option :ToastOptionEntity;
		option = new ToastOptionEntity('', 3000, 'top');
		// 空配列の場合
		if(error = []) {
			option.setMessage('ポートフォリオが登録されていません');
		} else {
			option.setMessage('システムエラー');
		}
		let toast = this._toastCtrl.create(option.getOption());
		toast.present();
	}


	/**
	 * ポートフォリオ 削除成功後処理
	 * @private
	 * @param {any} res
	 * @return {void}
	 */
	private onSuccessDelete(res :any) :void {
		let option :ToastOptionEntity;
		option = new ToastOptionEntity('', 3000, 'top');
		option.setMessage('削除しました');
		let toast = this._toastCtrl.create(option.getOption());
		toast.present();

		// 初期化する
		this.ngOnInit();
	}

	/**
	 * ポートフォリオ 削除失敗後処理
	 * @private
	 * @param {any} error [description]
	 * @return {void}
	 */
	private onFailDelete(error :any) :void {
		let option :ToastOptionEntity;
		option = new ToastOptionEntity('', 3000, 'top');
		option.setMessage('削除に失敗しました');
		let toast = this._toastCtrl.create(option.getOption());
		toast.present();
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
		console.log('PortfolioListPage.deletePortfolio: start');

		// アラート表示パラメータの設定
		let title :string = '確認';
		let message :string = 'ポートフォリオを削除します｡\nよろしいですか?';
		let buttons :Array<Object> = [
			{'text': 'OK', 'handler': () => this.runDeletePortfolio(portfolio.getNo())},
			{'text': 'CANCEL', 'handler': () => console.log('cancel')},
		];

		// ダイアログ (OK､キャンセル)
		let dialog = this._alertCtrl.create({'title': title, 'message': message, 'buttons': buttons});
		dialog.present();
	}

	/**
	 * ポートフォリオ表示
	 * @param {PortfolioEntity} portfolio 削除対象のポートフォリオ
	 */
	public showPortfolio(portfolio: PortfolioEntity) :void {
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
