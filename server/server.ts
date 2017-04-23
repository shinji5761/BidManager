// === ミドルウェア
import express = require('express');
import jsonp = require('jsonp-express');
import bodyParser = require('body-parser');
import logger = require('./LogSettings');

// === API ===
import { PortfolioListController } from './javascript/controller/portfolio_list/PortfolioListController';
import { PortfolioController } from './javascript/controller/portfolio/PortfolioController';
import { OneDayController } from './javascript/controller/one_day/OneDayController';

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
		this.controller['portfolioList'] = new PortfolioListController();
		this.controller['oneDay'] = new OneDayController();
	}

	/**
	 * APIの設定
	 * @private
	 */
	private settingApi() :void {
		logger.system.debug('Main - settingApi');
		///////////////////// PortfolioList /////////////////////
		this.app.get(this.controller['portfolioList'].getUrl(), (req, res) => this.controller['portfolioList'].get(req, res));

		///////////////////// Portfolio /////////////////////
		this.app.get(this.controller['portfolio'].getUrl(), (req, res) => this.controller['portfolio'].get(req, res));
		this.app.post(this.controller['portfolio'].getUrl(), (req, res) => this.controller['portfolio'].post(req, res));
		this.app.put(this.controller['portfolio'].getUrl(), (req, res) => this.controller['portfolio'].put(req, res));
		this.app.delete(this.controller['portfolio'].getUrl() + '/no/:no', (req, res) => this.controller['portfolio'].delete(req, res));

		///////////////////// OneDay /////////////////////
		this.app.get(this.controller['oneDay'].getUrl(), (req, res) => this.controller['oneDay'].get(req, res));
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
var main: Server = new Server();
