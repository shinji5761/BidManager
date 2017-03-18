import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';

// === Entity ===
import { PortfolioEntity } from '../../entity/PortfolioEntity';
import { BrandEntity } from '../../entity/BrandEntity';
import { ButtonEntity } from '../../entity/ButtonEntity';
import { ToastOptionEntity } from '../../entity/ToastOptionEntity';

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
	 * @param _api 
	 */
	constructor(
		public _navCtrl: NavController,
		public _navParams: NavParams,
		private _viewCtrl: ViewController,
		private _toastCtrl: ToastController,
		private _accessor: ApiAccessor
	) {}

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
	}

	/**
	 * ポートフォリオ 作成処理
	 * @private 
	 * @return {void}
	 */
	private runPostPortfolio() :void {
		this.portfolioAccessor.post(this.portfolio).subscribe(
			res => this.runPostPurchases(res),
			error => this.onFailSave(error)
		);
	}

	/**
	 * ポートフォリオ 更新処理
	 * @private 
	 * @return {void}
	 */
	private runPutPortfolio() :void {
		this.portfolioAccessor.update(this.portfolio).subscribe(
			res => this.onSuccessSave(res),
			error => this.onFailSave(error)
		);
	}

	/**
	 * 購入情報 取得
	 * @private
	 * @return {void}
	 */
	private runGetPurchases() :void {
		// ポートフォリオのIDがある場合
		if(this.portfolio.getId() != null) {
			this.purchasesAccessor.setNo(this.portfolio.getId());
			this.purchasesAccessor.query().subscribe(
				res => this.createBrand(res),
				error => console.error(error)
			);
		} else {
			// dummyを差し込む
			this.portfolio.getBrand().push(new BrandEntity(null, null, 0, 0));
		}
	}

	/**
	 * 購入物 作成処理
	 * @private 
	 * @return {void}
	 */
	private runPostPurchases(data :any) :void {
		let postList : Array<any> = [];
		this.purchasesAccessor.setNo(data.insertId);
		// 銘柄の数だけ､POSTリクエストを送信する｡
		for(let index in this.portfolio.getBrand()) {
			let data :BrandEntity = this.portfolio.getBrand()[index];
			postList.push(this.purchasesAccessor.post(data));
		}
		// 待ち合わせ
		Observable.forkJoin(postList).subscribe(
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
		let toastOption = new ToastOptionEntity('保存しました｡', 2000);
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
		let toastOption = new ToastOptionEntity('保存に失敗しました｡', 2000);
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
		this.portfolio.setBrand(res);
	}


	/**
	 * ポートフォィオを追加する
	 * @private
	 * @return {void}
	 */
	private save() :void {
		// Noが付いている場合はPUT,nullの場合はPOST
		if(this.portfolio.getId() != null) {
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
		this.portfolio.getBrand().push(new BrandEntity(null, null, 0, 0));
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
