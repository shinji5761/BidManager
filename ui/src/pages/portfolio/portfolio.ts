import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/finally';

// === Page ===
import { BrandPage } from '../brand/brand';

// === Dialog ===
import { EditPortfolioDialogPage } from '../edit-portfolio-dialog/edit-portfolio-dialog';

// === Entity ===
import { PortfolioEntity } from '../../entity/PortfolioEntity';
import { BrandEntity } from '../../entity/BrandEntity';
import { ToastOptionEntity } from '../../entity/ToastOptionEntity';

// === Library ===
import { DialogLibrary } from '../../providers/library/DialogLibrary';

// === API ===
import { ApiAccessor } from '../../providers/api/api-accessor';
import { BrandApiService } from '../../providers/api/BrandApiService';

@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html'
})
export class PortfolioPage implements OnInit, OnDestroy {

	/**
	 * ポートフォリオ
	 * @private
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
	 * API Service
	 * @private
	 * @type {BrandApiService}
	 */
	private api :BrandApiService;


	/**
	 * @constructor
	 * @param _navCtrl
	 * @param _navParams
	 * @param _modalCtrl
	 * @param _toastCtrl
	 * @param _loadingCtrl
	 * @param _dialogLib
	 * @param _accessor
	 */
	constructor(
		public _navCtrl :NavController,
		public _navParams :NavParams,
		public _modalCtrl :ModalController,
		public _toastCtrl :ToastController,
		public _loadingCtrl :LoadingController,
		private _dialogLib :DialogLibrary,
		private _accessor :ApiAccessor ) {
		console.log('Portfolio.constructor: start');
		// APIの取得
		this.api = this._accessor.getBrandApiService();
		this.portfolio = this._navParams.get('portfolio');
	};

	/**
	 * 初期化
	 * @return {void}
	 */
	ngOnInit() :void {
		console.log('Portfolio.ngOnInit: start');
		this.runGetPurchases();
	};

	/**
	 * ページ終了処理
	 */
	ngOnDestroy() :void {
		this.completion();
	}

	/**
	 * ポートフォリオに登録している銘柄を取得する
	 * @private
	 * @return {void}
	 */
	private runGetPurchases() :void {
		console.log('Portfolio.runGetPurchases: start');
		// ローディングダイアログ 作成･開始
		this.loader = this._dialogLib.createGetDialog(this._loadingCtrl);
		this.loader.present();
		// 指定したポートフォリオ番号を取得する
		let option = {
			'portfolioNo': this.portfolio.getPortfolioNo()
		};
		this.api.setOption(option);
		this.api.query()
		.finally(() => this.completion())
		.subscribe(
			res => this.createPurchases(res),
			error => this.isError(error)
		);
	};

	/**
	 * ポートフォリオ 取得エラー
	 * @param {any} error [description]
	 */
	public isError(error :any) :void {
		console.log('Portfolio.constructor: isError');
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
	};

	/**
	 * Http通信 終了後処理
	 */
	private completion() :void {
		console.log('Portfolio.completion: start');
		if(this.loader){
			this.loader.dismiss();
			delete this.loader;
		}
	}

	/**
	 * 銘柄情報を作成する
	 * @private
	 * @param {any} result 取得結果
	 * @return {void}
	 */
	private createPurchases(result) :void {
		console.log('Portfolio.createPurchases: start');
		let brandList :Array<BrandEntity> = [];
		for(let index in result) {
			let brand :BrandEntity = new BrandEntity(index, result[index].brandCode, result[index].brandName, result[index].price, result[index].stock);
			brandList.push(brand);
		}
		this.portfolio.setBrand(brandList);
	};


	/**
	 * ポートフォリオ編集
	 * @private
	 * @return {void}
	 */
	private editPortfolio() :void {
		console.log('Portfolio.editPortfolio: start');
		// パラメータの設定
		let title = this.portfolio.getPortfolioName() + 'の編集';
		let inputData = {'portfolio': this.portfolio, 'title': title};

		// ダイアログの設定
		let modal = this._modalCtrl.create(EditPortfolioDialogPage, inputData);

		// ダイアログ終了イベントの設定
		modal.onDidDismiss((data) => {
			console.log('Portfolio.onDidDismiss: start');
			// ポートフォリオを初期化
			this.ngOnInit();
		});

		// Dialog展開
		modal.present();
	};

	/**
	 * 銘柄情報表示
	 * @private
	 * @return {void}
	 */
	private showBrand(brand :BrandEntity) :void {
		console.log('Portfolio.showBrand: start');
		let inputData = {'brand': brand};
		this._navCtrl.push(BrandPage, inputData);
	};
}
