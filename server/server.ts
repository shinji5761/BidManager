// === ミドルウェア
import express = require('express');
import jsonp = require('jsonp-express');
import bodyParser = require('body-parser');
import logger = require('./LogSettings');

// === API ===
import { PortfolioController } from './javascript/controller/portfolio/PortfolioController';
import { BrandController } from './javascript/controller/brand/BrandController';
import { OneDayController } from './javascript/controller/one_day/OneDayController';
import { MarketInfoController } from './javascript/controller/market_info/MarketInfoController';

/**
 * メインクラス
 * @class
 */
class Server {

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
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));
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
		this.controller['brand'] = new BrandController();
		this.controller['oneDay'] = new OneDayController();
		this.controller['marketInfo'] = new MarketInfoController();
	}

	/**
	 * APIの設定
	 * @private
	 */
	private settingApi() :void {
		logger.system.debug('Main - settingApi');

		///////////////////// Portfolio /////////////////////
		this.app.get(this.controller['portfolio'].getUrl() + '/:portfolioNo', (req, res) => this.controller['portfolio'].get(req, res));		// GET(単一)
		this.app.get(this.controller['portfolio'].getUrl(), (req, res) => this.controller['portfolio'].query(req, res));						// GET(複数)
		this.app.post(this.controller['portfolio'].getUrl(), (req, res) => this.controller['portfolio'].post(req, res));						// POST
		this.app.put(this.controller['portfolio'].getUrl() + '/:portfolioNo', (req, res) => this.controller['portfolio'].put(req, res));		// PUT
		this.app.delete(this.controller['portfolio'].getUrl() + '/:portfolioNo', (req, res) => this.controller['portfolio'].delete(req, res));	// DELETE

		///////////////////// Brand /////////////////////
		this.app.get(this.controller['brand'].getUrl() + '/:brandNo', (req, res)=> this.controller['brand'].get(req, res));		// Get(単一)
		this.app.get(this.controller['brand'].getUrl(), (req, res)=> this.controller['brand'].query(req, res));					// Get(複数)

		///////////////////// OneDay /////////////////////
		this.app.get(this.controller['oneDay'].getUrl() + '/:brandCode', (req, res) => this.controller['oneDay'].query(req, res));

		///////////////////// MarketInfo /////////////////////
		this.app.get(this.controller['marketInfo'].getUrl() + '/:brandCode', (req, res) => this.controller['marketInfo'].query(req, res));		// GET(複数)
	}


	/**
	 * サーバーの開始
	 * @private
	 * @return {void}
	 */
	private start() :void {
		logger.system.debug('Main - start');
		// サーバーの開始
		this.app.listen('18456');
		// this.app.listen('18456', function() {
		// 	logger.system.info('Main - ListenStart...');
		// });
	}
}

// メインクラスの実行
var main: Server = new Server();
