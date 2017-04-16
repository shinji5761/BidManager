import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

// === Entity ===
import { BrandEntity } from '../../entity/BrandEntity';
import { ChartEntity } from '../../entity/ChartEntity';
import { ChartDatasetEntity } from '../../entity/ChartDatasetEntity';

// === Library ===
import { DialogLibrary } from '../../providers/library/DialogLibrary';

// === Api ===
import { ApiAccessor } from '../../providers/api/api-accessor';
import { BrandApiService } from '../../providers/api/BrandApiService';


@Component({
	selector: 'page-brand',
	templateUrl: 'brand.html'
})
export class BrandPage implements OnInit {
	// === 定数 ===
	private static CHART_OPTION :Object = {
		'scales': {
			'xAxes': [
				{'ticks': {'autoSkipPadding': 50, 'maxRotation': 0}}
			],
			'yAxes': [
				{'ticks': {'autoSkipPadding': 50}}
			]
		}
	};



	/**
	 * ブランド情報
	 * @private
	 * @type {BrandEntity}
	 */
	private brand :BrandEntity;

	/**
	 * チャートデータ
	 * @private
	 * @type {ChartEntity}
	 */
	private bidChart :ChartEntity;

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
	 * @param _toastCtrl
	 * @param _loadingCtrl
	 * @param _dialogLib
	 * @param _accessor
	 */
	constructor(
		public _navCtrl :NavController,
		public _navParams :NavParams,
		private _toastCtrl :ToastController,
		private _loadingCtrl :LoadingController,
		private _dialogLib :DialogLibrary,
		public _accessor :ApiAccessor
	) {
		// APIの取得
		this.api = this._accessor.getBrandApiService();
		this.brand = this._navParams.get('brand');
	};

	/**
	 * 初期化処理
	 * @return {void}
	 */
	ngOnInit() :void {
		// チャートオプション
		let bidOptions = BrandPage.CHART_OPTION;
		// チャートデータの初期化
		this.bidChart = new ChartEntity('line', [], [], bidOptions);

		// チャートデータの取得
		this.createBrand();
	};


	/**
	 * CreateBrand
	 * @private
	 * @return {void}
	 */
	private createBrand() :void {
		// ローディングダイアログ 作成･開始
        let loader = this._dialogLib.createGetDialog(this._loadingCtrl);
        loader.present();

		this.api.setCode(this.brand.getCode());
		this.api.query()
		.finally(() => {
            // ローディングダイアログ 終了
            loader.dismiss();
        })
		.subscribe(
			(result) => {
				this.createChart(result);
				// this.createGrid(result);
			},
			(error) => {
				console.error(error);
				// todo: データが無い旨を表示
			}
		);
	};

	/**
	 * チャートの作成
	 * 取得したデータの終値を抽出し､チャート用のデータに加工する｡
	 * @private
	 * @param {Array<any>} data 銘柄データ
	 */
	private createChart(data :Array<any>) :void {
		let dateArray :Array<string> = [];
		let chartData :Array<ChartDatasetEntity> = [];
		let closeArray :Array<number> = [];

		// 取得したデータの終値を抽出
		for(let index in data) {
            dateArray.push(data[index]['date']);
			closeArray.push(data[index]['close']);
		}
		chartData.push(new ChartDatasetEntity(closeArray, '1日足'));
		this.bidChart.setLabels(dateArray);
		this.bidChart.setDataset(chartData);
	};
}
