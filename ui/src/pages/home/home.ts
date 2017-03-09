/**
 * @author shinji5761@gmail.com
 * 
 */

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	
	// === タイトル ===
	title: string = 'ホーム';

	constructor(
		public _navCtrl: NavController,
		public _navParams: NavParams
	) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad HomePage');
	}

}
