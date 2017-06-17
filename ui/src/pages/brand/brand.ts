import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/finally';

// === Entity ===
import { BrandEntity } from '../../entity/BrandEntity';
import { ChartEntity } from '../../entity/ChartEntity';
import { ChartDatasetEntity } from '../../entity/ChartDatasetEntity';
import { SelectTermEntity } from '../../entity/SelectTermEntity';

// === Library ===
import { DialogLibrary } from '../../providers/library/DialogLibrary';
import { DateLibrary }	from '../../providers/library/DateLibrary';

// === Api ===
import { ApiAccessor } from '../../providers/api/api-accessor';
import { MarketInfoApiService } from '../../providers/api/MarketInfoApiService';
import { OneDayApiService } from '../../providers/api/OneDayApiService';

@Component({
	selector: 'page-brand',
	templateUrl: 'brand.html'
})
export class BrandPage implements OnInit, OnDestroy {
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
	}

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
	 * 市場データ
	 * @private
	 * @type {any}
	 */
	private marketInfo :any;

	/**
	 * 表示期間一覧
	 * @type {string}
	 */
	private terms : Array<SelectTermEntity> = [
		new SelectTermEntity('5分足', '5min'),
		new SelectTermEntity('1日足', '1day'),
		new SelectTermEntity('1ヶ月足', '1month')
	];

	/**
	 * 表示期間
	 * @type {string}
	 */
	private selectedTerm : string;

	/**
	 * ロードダイアログ
	 * @private
	 * @type {any}
	 */
	private loader :any;

	/**
	 * API Service
	 * @private
	 * @type {MarketInfoApiService}
	 */
	private api :MarketInfoApiService;

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
		private _dateLib :DateLibrary,
		public _accessor :ApiAccessor
	) {
		this.brand = this._navParams.get('brand');
		// 表示期間の初期化(5min)
		this.selectedTerm = this.terms[1].getValue();

		// 市場情報の初期化
		this.marketInfo = {};
	}

	/**
	 * 初期化処理
	 * @return {void}
	 */
	ngOnInit() :void {
		// チャートオプション
		let bidOptions = BrandPage.CHART_OPTION;
		// チャートデータの初期化
		this.bidChart = new ChartEntity('line', [], [], bidOptions);

		// APIの選択
		this.api = this.selectApi();
		this._accessor.getMarketInfoApiService();

		// チャートデータの取得
		this.createBrand();
	}


	/**
	 * ページ終了処理
	 */
	ngOnDestroy() :void {
		// ダイアログが残っている場合､解除する
		this.loader.dismiss();
	}

	/**
	 * API選択処理
	 * 表示足によってAPIを選択する
	 */
	private selectApi() : any {
		let api;
		switch(this.selectedTerm) {
			case this.terms[0].getValue() :
				api = this._accessor.getMarketInfoApiService();
				break;
			case this.terms[1].getValue() :
				api = this._accessor.getMarketOneDayInfoApiService();
				break;
			case this.terms[2].getValue() :
				api = this._accessor.getMarketInfoApiService();
				break;
		}
		return api;
	}


	/**
	 * CreateBrand
	 * @private
	 * @return {void}
	 */
	private createBrand() :void {
		// ローディングダイアログ 作成･開始
		this.loader = this._dialogLib.createGetDialog(this._loadingCtrl);
		this.loader.present();

		this.api.setBrandCode(this.brand.getBrandCode());
		this.api.query()
		.finally(() => this.completion())
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
	}

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

		this.createMarketInfo(data);

		// 取得したデータの終値を抽出
		for(let index in data) {
			// 5分足の場合
			if(this.selectedTerm == this.terms[0].getValue())
				dateArray.push(data[index]['targetDate'] + ' ' + data[index]['hour'] + ':' + data[index]['min']);
			else
				dateArray.push(data[index]['targetDate']);
			closeArray.push(data[index]['close']);
		}
		chartData.push(new ChartDatasetEntity(closeArray, this.selectedTerm));
		this.bidChart.setLabels(dateArray);
		this.bidChart.setDataset(chartData);
	}

	/**
	 * 市場情報データ作成
	 * @param {Array<any>} data [description]
	 */
	private createMarketInfo(data :Array<any>) :void {
		let length = data.length - 1;
		this.marketInfo['open'] = data[length]['open'];
		this.marketInfo['high'] = data[length]['high'];
		this.marketInfo['low'] = data[length]['low'];
		this.marketInfo['close'] = data[length]['close'];
		this.marketInfo['volume'] = data[length]['volume'];
	}

	/**
	 * Http通信 終了後処理
	 */
	private completion() :void {
		this.loader.dismiss();
	}


	// === イベントハンドラ ===
	/**
	 * 表示足変更イベントハンドラ
	 * @private
	 */
	private changeSelectTerm() :void {
		console.log('Brand.changeSelectTerm : start');
		console.log('Brand.changeSelectTerm : selectedTerm=' + this.selectedTerm);
		this.ngOnInit();
	};


}
