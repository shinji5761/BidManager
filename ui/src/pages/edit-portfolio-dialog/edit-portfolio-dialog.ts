import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs';

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
import { PurchasesApiService } from '../../providers/api/PurchasesApiService';


@Component({
	selector: 'page-edit-portfolio-dialog',
	templateUrl: 'edit-portfolio-dialog.html'
})
export class EditPortfolioDialogPage implements OnInit {

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
	 * PortfolioAPI
	 * @private
	 * @type {PortfolioApiService}
	 */
	private portfolioAccessor :PortfolioApiService;

	/**
	 * PurchasesAPI
	 * @private
	 * @type {PurchasesApiService}
	 */
	private purchasesAccessor :PurchasesApiService;


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
		this.portfolioAccessor = this._accessor.getPortfolioApiService();
		this.purchasesAccessor = this._accessor.getPurchasesApiService();

		// 購入情報取得
		this.runGetPurchases();
	};

	/**
	 * 購入情報 取得
	 * @private
	 * @return {void}
	 */
	private runGetPurchases() :void {
		// ポートフォリオのIDがある場合
		if(this.portfolio.getNo() != null) {
			// ローディングダイアログ 作成･開始
			let loader = this._dialogLib.createGetDialog(this._lodingCtrl);
			loader.present();

			this.purchasesAccessor.setNo(this.portfolio.getNo());
			this.purchasesAccessor.query()
			.finally(() => {
				// ローディングダイアログ 終了
				loader.dismiss();
			})
			.subscribe(
				res => this.createBrand(res),
				error => console.error(error)
			);
		} else {
			// dummyを差し込む
			this.portfolio.getBrand().push(new BrandEntity(null, null, null, 0, 0));
		}
	};

	/**
	 * ポートフォリオ 作成処理
	 * @private
	 * @return {void}
	 */
	private runPostPortfolio() :void {
		// ローディングダイアログ 作成･開始
		let loader = this._dialogLib.createSaveDialog(this._lodingCtrl);
		loader.present();

		this.portfolioAccessor.post(this.portfolio)
		.finally(() => {
			// ローディングダイアログ 終了
			loader.dismiss();
		})
		.subscribe(
			res => this.runPostPurchases(res.insertId),
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
		let loader = this._dialogLib.createSaveDialog(this._lodingCtrl);
		loader.present();

		this.portfolioAccessor.update(this.portfolio)
		.finally(() => {
			// ローディングダイアログ 終了
			loader.dismiss();
		})
		.subscribe(
			res => this.runPostPurchases(this.portfolio.getNo()),
			error => this.onFailSave(error)
		);
	}

	/**
	 * 購入物 作成処理
	 * @private
	 * @return {void}
	 */
	private runPostPurchases(no) :void {
		let postList : Array<any> = [];
		this.purchasesAccessor.setNo(no);

		// 銘柄の数だけ､POSTリクエストを送信する｡
		for(let index in this.portfolio.getBrand()) {
			let data :BrandEntity = this.portfolio.getBrand()[index];
			postList.push(this.purchasesAccessor.post(data));
		}

		if(postList.length) {
			// ローディングダイアログ 作成･開始
			let loader = this._dialogLib.createSaveDialog(this._lodingCtrl);
			loader.present();

			// 待ち合わせ
			Observable.forkJoin(postList)
			.finally(() => {
				// ローディングダイアログ 終了
				loader.dismiss();
			})
			.subscribe(
				res => this.onSuccessSave(res),
				error => this.onFailSave(error)
			);
		}
		else {
			this.onSuccessSave(null);
		}
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
	 * 購入情報 作成
	 * @private
	 * @param {any} res 取得結果
	 * @return {void}
	 */
	private createBrand(res :any) :void {
		let brandList :Array<BrandEntity> = [];
		for(let index in res) {
			brandList.push(new BrandEntity(res[index].brandNo, res[index].code, res[index].name, res[index].price, res[index].stock));
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
		if(this.portfolio.getNo() != null) {
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
		this.portfolio.getBrand().push(new BrandEntity(null, null, null, 0, 0));
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
