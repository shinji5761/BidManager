import express = require('express');
import jsonp = require('jsonp-express');
import bodyParser = require('body-parser');

// === API ===
import { PortfolioController } from './javascript/controller/portfolio/PortfolioController';

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
		this.app = express();

		this.controller['portfolio'] = new PortfolioController();

		this.settingMiddleware();

		this.settingApi();

		this.start();
	}

	/**
	 * ミドルウェアの設定
	 */
	private settingMiddleware() :void {
		this.app.use(function(req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			next();
		});
		this.app.use(bodyParser.urlencoded({'extended': true}));
		this.app.use(bodyParser.json());
		this.app.use(jsonp);
	};

	/**
	 * APIの設定
	 */
	private settingApi() :void {
		this.app.get('/', function(req, res) {
			res.send('HelloWorld');
		});

		///////////////////// Portfolio /////////////////////
		this.app.get(this.controller['portfolio'].getUrl(), (req, res) => this.controller['portfolio'].get(req, res));
		this.app.post(this.controller['portfolio'].getUrl(), (req, res) => this.controller['portfolio'].post(req, res));
	}


	/**
	 * サーバーの開始
	 */
	start() :void {
		// サーバーの開始
		this.app.listen('18456', function() {
			console.log('listen ...');
		});
	}
}

// メインクラスの実行
var main: Main = new Main();