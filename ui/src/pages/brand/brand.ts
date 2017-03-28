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
		// チャートデータの初期化
		this.bidChart = new ChartEntity('line', [], []);

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
		let dataset :Array<ChartDatasetEntity> = [];
		let closeArray :Array<number> = [];
		let dateArray :Array<string> = [];
		for(let index in data) {
			closeArray.push(data[index]['close']);
			dateArray.push(data[index]['date']);
		}

		dataset.push(new ChartDatasetEntity(closeArray, '5分足'));

		this.bidChart.setLabels(dateArray);
		this.bidChart.setDataset(dataset);
	}
}
