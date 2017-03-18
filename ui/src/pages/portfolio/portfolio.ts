import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


// === Entity ===
import { PortfolioEntity } from '../../entity/PortfolioEntity';
import { BrandEntity } from '../../entity/BrandEntity';

@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html'
})
export class PortfolioPage {
	items = new Array(3);
	
	/**
	 * ポートフォリオ
	 * @private 
	 * @type {PortfolioEntity}
	 */
	private portfolio :PortfolioEntity;

	/**
	 * @constructor
	 * @param _navCtrl 
	 * @param _navParams 
	 */
	constructor(
		public _navCtrl: NavController,
		public _navParams: NavParams
	) {
		this.portfolio = this._navParams.get('portfolio');
		this.runGetPurchases();
	}


	/**
	 * ポートフォリオに登録している銘柄を取得する
	 * @private
	 * @return {void}
	 */
	private runGetPurchases() :void {
		

	}

	/**
	 * 銘柄情報を取得する
	 * @private 
	 * @return {void}
	 */
	private createPurchases() :void {

	}

	
	/**
	 * ポートフォリオ編集
	 * @private 
	 * @return {void}
	 */
	private editPortfolio() :void {

	}

	/**
	 * 銘柄情報表示
	 * @private 
	 * @return {void}
	 */
	private showBrand(brand :BrandEntity) :void {

	}



}
