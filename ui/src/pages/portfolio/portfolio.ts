import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';

// === Page ===
import { BrandPage } from '../brand/brand';

// === Dialog ===
import { EditPortfolioDialogPage } from '../edit-portfolio-dialog/edit-portfolio-dialog';

// === Entity ===
import { PortfolioEntity } from '../../entity/PortfolioEntity';
import { BrandEntity } from '../../entity/BrandEntity';
import { ToastOptionEntity } from '../../entity/ToastOptionEntity';

// === API ===
import { ApiAccessor } from '../../providers/api/api-accessor';
import { PurchasesApiService } from '../../providers/api/PurchasesApiService';


@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html'
})
export class PortfolioPage implements OnInit {
	
	/**
	 * ポートフォリオ
	 * @private 
	 * @type {PortfolioEntity}
	 */
	private portfolio :PortfolioEntity;

	/**
	 * API Service
	 * @private 
	 * @type {PurchasesApiService}
	 */
	private api :PurchasesApiService;


	/**
	 * @constructor
	 * @param _navCtrl 
	 * @param _navParams 
	 */
	constructor(
		public _navCtrl :NavController,
		public _navParams :NavParams,
		public _modalCtrl :ModalController,
		public _loadingCtrl :LoadingController,
		public _toastCtrl :ToastController,
		private _accessor :ApiAccessor
	) {
		// APIの取得
		this.api = this._accessor.getPurchasesApiService();
		this.portfolio = this._navParams.get('portfolio');
	}

	/**
	 * 初期化
	 * @return {void}
	 */
	ngOnInit() :void {
		this.runGetPurchases();
	}


	/**
	 * ポートフォリオに登録している銘柄を取得する
	 * @private
	 * @return {void}
	 */
	private runGetPurchases() :void {
		this.api.setNo(this.portfolio.getNo());
		this.api.query().subscribe(
			res => this.createPurchases(res),
			error => this.isError(error)
		);
	}

	/**
	 * ポートフォリオ 取得エラー
	 * @param {any} error [description]
	 */
	public isError(error :any) :void {
		let option :ToastOptionEntity;
		option = new ToastOptionEntity('', 3000, 'top');
		// 空配列の場合
		if(error = []) {
			option.setMessage('銘柄が登録されていません');
		} else {
			option.setMessage('システムエラー');
		}
		let toast = this._toastCtrl.create(option.getOption());
		toast.present();
	}

	/**
	 * 銘柄情報を作成する
	 * @private 
	 * @param {any} result 取得結果
	 * @return {void}
	 */
	private createPurchases(result) :void {
		let brandList :Array<BrandEntity> = [];
		for(let index in result) {
			let brand :BrandEntity = new BrandEntity(result[index].code, result[index].name, result[index].price, result[index].stock);
			brandList.push(brand);
		}
		this.portfolio.setBrand(brandList);
	}

	
	/**
	 * ポートフォリオ編集
	 * @private 
	 * @return {void}
	 */
	private editPortfolio() :void {
		// パラメータの設定
		let title = this.portfolio.getName() + 'の編集';
		let inputData = {'portfolio': this.portfolio, 'title': title};

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
	 * 銘柄情報表示
	 * @private 
	 * @return {void}
	 */
	private showBrand(brand :BrandEntity) :void {
		let inputData = {'brand': brand};
		this._navCtrl.push(BrandPage, inputData);
	}
}
