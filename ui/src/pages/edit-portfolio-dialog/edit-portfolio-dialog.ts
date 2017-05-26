import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/finally';

// === Entity ===
import { PortfolioEntity } from '../../entity/PortfolioEntity';
import { BrandEntity } from '../../entity/BrandEntity';
import { ButtonEntity } from '../../entity/ButtonEntity';
import { ToastOptionEntity } from '../../entity/ToastOptionEntity';

// === Library ===
import { DialogLibrary } from '../../providers/library/DialogLibrary';

// === API ===
import { ApiAccessor } from '../../providers/api/api-accessor';
import { PortfolioApiService } from '../../providers/api/PortfolioApiService';
import { BrandApiService } from '../../providers/api/BrandApiService';


@Component({
	selector: 'page-edit-portfolio-dialog',
	templateUrl: 'edit-portfolio-dialog.html'
})
export class EditPortfolioDialogPage implements OnInit, OnDestroy {

	/**
	 * タイトル
	 * @private
	 * @type {string}
	 */
	private title :string;

	/**
	 * ポートフォリオ
	 * @type {PortfolioEntity}
	 */
	private portfolio :PortfolioEntity;

	/**
	 * ロードダイアログ
	 * @private
	 * @type {any}
	 */
	private loader :any;

	/**
	 * PortfolioAPI
	 * @private
	 * @type {PortfolioApiService}
	 */
	private portfolioApiService :PortfolioApiService;

	/**
	 * brandApiService
	 * @private
	 * @type {brandApiService}
	 */
	private brandApiService :BrandApiService;


	/**
	 * ボタンオブジェクト
	 * @type {ButtonEntity}
	 */
	private buttons :Array<ButtonEntity> = [
		new ButtonEntity('保存', 'primary', () => { this.save(); }, function(){}),
		new ButtonEntity('キャンセル', 'danger',() => { this.close();}, function(){})
	];

	/**
	 * @constructor
	 * @param _navCtrl
	 * @param _navParams
	 * @param _viewCtrl
	 * @param _toastCtrl
	 * @param _lodingCtrl
	 * @param _lodingCtrl
	 * @param _api
	 */
	constructor(
		public _navCtrl :NavController,
		public _navParams :NavParams,
		private _viewCtrl :ViewController,
		private _toastCtrl :ToastController,
		private _lodingCtrl :LoadingController,
		private _dialogLib :DialogLibrary,
		private _accessor :ApiAccessor
	) {};

	/**
	 * 初期化
	 * @public
	 * @return {void}
	 */
	public ngOnInit() :void {
		this.title = this._navParams.get('title');
		this.portfolio = this._navParams.get('portfolio');
		this.portfolioApiService = this._accessor.getPortfolioApiService();
		this.brandApiService = this._accessor.getBrandApiService();

		// 購入情報取得
		this.runGetPortfolio();
	};

	/**
	 * ページ終了処理
	 */
	ngOnDestroy() :void {
		// ダイアログが残っている場合､解除する
		this.completion();
	}


	/**
	 * ポートフォィオ 取得
	 * @private
	 * @return {void}
	 */
	private runGetPortfolio() :void {
		// ポートフォリオのIDがある場合
		if(this.portfolio.getPortfolioNo() != null) {
			// ローディングダイアログ 作成･開始
			this.loader = this._dialogLib.createGetDialog(this._lodingCtrl);
			this.loader.present();
			let option = {'portfolioNo' : this.portfolio.getPortfolioNo()};
			this.brandApiService.setOption(option);
			this.brandApiService.query()
			.finally(() => this.completion())
			.subscribe(
				res => this.createBrand(res),
				error => console.error(error)
			);
		} else {
			// dummyを差し込む
			this.portfolio.getBrand().push(new BrandEntity(null, null, null, null, null, null, null));
		}
	};

	/**
	 * ポートフォリオ 作成処理
	 * @private
	 * @return {void}
	 */
	private runPostPortfolio() :void {
		// ローディングダイアログ 作成･開始
		this.loader = this._dialogLib.createSaveDialog(this._lodingCtrl);
		this.loader.present();
		this.portfolioApiService.setPortfolioNo(null);
		this.portfolioApiService.post(this.portfolio)
		.finally(() => this.completion())
		.subscribe(
			res => this.onSuccessSave(res),
			error => this.onFailSave(error)
		);
	}

	/**
	 * ポートフォリオ 更新処理
	 * @private
	 * @return {void}
	 */
	private runPutPortfolio() :void {
		// ローディングダイアログ 作成･開始
		this.loader = this._dialogLib.createSaveDialog(this._lodingCtrl);
		this.loader.present();
		this.portfolioApiService.setPortfolioNo(this.portfolio.getPortfolioNo());
		this.portfolioApiService.update(this.portfolio)
		.finally(() => this.completion())
		.subscribe(
			res => this.onSuccessSave(res),
			error => this.onFailSave(error)
		);
	}


	/**
	 * 保存成功後処理
	 * @param res
	 */
	private onSuccessSave(res :any) :void {
		// toast
		let toastOption = new ToastOptionEntity('保存しました｡', 2000, 'top');
		let toast = this._toastCtrl.create(toastOption.getOption());
		toast.present();

		// モーダルを閉じる
		this.close();
	}

	/**
	 * 保存失敗後処理
	 * @private
	 * @param {any} error
	 */
	private onFailSave(error :any) :void {
		// toast
		let toastOption = new ToastOptionEntity('保存に失敗しました｡', 2000, 'top');
		let toast = this._toastCtrl.create(toastOption.getOption());
		toast.present();
	}

	/**
	 * Http通信 終了後処理
	 */
	private completion() :void {
		if(this.loader) {
			this.loader.dismiss();
			delete this.loader;
		}
	}

	/**
	 * 購入情報 作成
	 * @private
	 * @param {any} res 取得結果
	 * @return {void}
	 */
	private createBrand(res :any) :void {
		let brandList :Array<BrandEntity> = [];
		for(let index in res) {
			brandList.push(new BrandEntity(index, res[index].brandCode, res[index].brandName, res[index].price, res[index].stock, res[index].marketPrice, res[index].latestDate));
		}
		this.portfolio.setBrand(brandList);
	}


	/**
	 * ポートフォィオを追加する
	 * @private
	 * @return {void}
	 */
	private save() :void {
		// 表示順序を更新する
		for( let index = 0; index < this.portfolio.getBrand().length; index++ ) {
			this.portfolio.getBrand()[index].setBrandNo(index);
		}

		// Noが付いている場合はPUT,nullの場合はPOST
		if(this.portfolio.getPortfolioNo() != null) {
			this.runPutPortfolio();
		} else {
			this.runPostPortfolio();
		}
	}


	/**
	 * モーダルを閉じる
	 * @private
	 * @return {void}
	 */
	private close() :void {
		this._viewCtrl.dismiss();
	}

	/**
	 * ブランド追加
	 * @private
	 * @return {void}
	 */
	private addBrand() :void {
		this.portfolio.getBrand().push(new BrandEntity(null, null, null, null, null, null, null));
	}

	/**
	 * ブランド削除
	 * @private
	 * @param {number} index
	 * @return {void}
	 */
	private deleteBrand(index :number) {
		this.portfolio.getBrand().splice(index, 1);
	}

}
