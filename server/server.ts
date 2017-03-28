// === ミドルウェア
import express = require('express');
import jsonp = require('jsonp-express');
import bodyParser = require('body-parser');
import logger = require('./LogSettings');

// === API ===
import { PortfolioController } from './javascript/controller/portfolio/PortfolioController';
import { PurchasesController } from './javascript/controller/purchases/PurchasesController';
import { BrandController } from './javascript/controller/brand/BrandController';

/**
 * メインクラス
 * @class
 */
class Main {

	// サーバーモジュール
	app;

	// api
	controller: Object = {};

	/**
	 * @constructor
	 */
	constructor() {
		logger.system.debug('Main - Constructor');
		this.app = express();
		// ミドルウェアの設定
		this.settingMiddleware();

		// コントローラの設定
		this.settingController();

		// APIの設定
		this.settingApi();

		// Server開始
		this.start();
	}

	/**
	 * ミドルウェアの設定
	 * @private
	 * @return {void}
	 */
	private settingMiddleware() :void {
		logger.system.debug('Main - settingMiddleware');
		this.app.use(function(req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
			next();
		});
		this.app.use(bodyParser());
		this.app.use(jsonp);
	};

	/**
	 * コントローラの設定
	 * @private
	 * @return {void}
	 */
	private settingController() :void {
		logger.system.debug('Main - settingController');
		this.controller['portfolio'] = new PortfolioController();
		this.controller['purchases'] = new PurchasesController();
		this.controller['brand'] = new BrandController();
	}

	/**
	 * APIの設定
	 * @private
	 */
	private settingApi() :void {
		logger.system.debug('Main - settingApi');
		///////////////////// Portfolio /////////////////////
		this.app.get(this.controller['portfolio'].getUrl(), (req, res) => this.controller['portfolio'].beforeGet(req, res));
		this.app.post(this.controller['portfolio'].getUrl(), (req, res) => this.controller['portfolio'].beforePost(req, res));
		this.app.put(this.controller['portfolio'].getUrl(), (req, res) => this.controller['portfolio'].beforePut(req, res));

		///////////////////// Purchases /////////////////////
		this.app.get(this.controller['purchases'].getUrl(), (req, res) => this.controller['purchases'].beforeGet(req, res));
		this.app.post(this.controller['purchases'].getUrl(), (req, res) => this.controller['purchases'].beforePost(req, res));

		///////////////////// Brand /////////////////////
		this.app.get(this.controller['brand'].getUrl(), (req, res) => this.controller['brand'].beforeGet(req, res));
	}


	/**
	 * サーバーの開始
	 * @private
	 * @return {void}
	 */
	private start() :void {
		logger.system.debug('Main - start');
		// サーバーの開始
		this.app.listen('18456', function() {
			logger.system.info('Main - ListenStart...');
		});
	}
}

// メインクラスの実行
var main: Main = new Main();
