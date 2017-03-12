import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

// === Entity ===
import { PortfolioEntity } from '../../entity/PortfolioEntity';
import { ButtonEntity } from '../../entity/ButtonEntity';

// === API ===
import { ApiAccessor } from '../../providers/api/api-accessor';
import { PortfolioApiService } from '../../providers/api/PortfolioApiService';


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
	 * API
	 * @private
	 * @type {PortfolioApiService}
	 */
	private api :PortfolioApiService;
	

	/**
	 * ボタンオブジェクト
	 * @type {ButtonEntity}
	 */
	private buttons :Array<ButtonEntity> = [
		new ButtonEntity('保存', 'primary', () => { this.save(); }, function(){}),
		new ButtonEntity('キャンセル', 'danger',() => { this.cancel();}, function(){})
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
		this.api = this._accessor.getPurchasesApiService();

		
	}


	/**
	 * ポートフォィオを追加する
	 * @private
	 * @return {void}
	 */
	private save() :void {
		alert('save');
	}


	/**
	 * モーダルを閉じる
	 * @private
	 * @return {void}
	 */
	private cancel() :void {
		this._viewCtrl.dismiss();
	}
}
