import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// === Entity ===
import { BrandEntity } from '../../entity/BrandEntity';
import { ChartEntity } from '../../entity/ChartEntity';
import { ChartDatasetEntity } from '../../entity/ChartDatasetEntity';

// === Provider ===
import { ApiAccessor } from '../../providers/api/api-accessor';
import { BrandApiService } from '../../providers/api/BrandApiService';

@Component({
	selector: 'page-brand',
	templateUrl: 'brand.html'
})
export class BrandPage implements OnInit {

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
	 */
	constructor(
		public _navCtrl :NavController,
		public _navParams :NavParams,
		public _accessor :ApiAccessor
	) {
		// APIの取得
		this.api = this._accessor.getBrandApiService();
		this.brand = this._navParams.get('brand');
	}

	/**
	 * 初期化処理
	 * @return {void}
	 */
	ngOnInit() :void {
		// チャートオプション
		let bidOptions = {
			'scales': {'xAxes': [{'display': false}]}
		};
		// チャートデータの初期化
		this.bidChart = new ChartEntity('line', [], [], bidOptions);

		// チャートデータの取得
		this.createBrand();
	}


	/**
	 * CreateBrand
	 * @private
	 * @return {void}
	 */
	private createBrand() :void {
		this.api.setCode(this.brand.getCode());
		this.api.query().subscribe(
			(result) => {
				this.createChart(result);
				// this.createGrid(result);
			},
			(error) => console.error(error)
		);
	}

	/**
	 * createChart
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
	}
}
