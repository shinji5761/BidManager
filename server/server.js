"use strict";
exports.__esModule = true;
var express = require("express");
var jsonp = require("jsonp-express");
var bodyParser = require("body-parser");
// === API ===
var PortfolioController_1 = require("./javascript/controller/portfolio/PortfolioController");
var PurchasesController_1 = require("./javascript/controller/purchases/PurchasesController");
/**
 * メインクラス
 * @class
 */
var Main = (function () {
    /**
     * @constructor
     */
    function Main() {
        // api
        this.controller = {};
        this.app = express();
        // ミドルウェアの設定
        this.settingMiddleware();
        // コントローラの設定
        this.controller['portfolio'] = new PortfolioController_1.PortfolioController();
        this.controller['purchases'] = new PurchasesController_1.PurchasesController();
        // APIの設定
        this.settingApi();
        // Server開始
        this.start();
    }
    /**
     * ミドルウェアの設定
     * @private
     */
    Main.prototype.settingMiddleware = function () {
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.app.use(bodyParser());
        this.app.use(jsonp);
    };
    ;
    /**
     * APIの設定
     * @private
     */
    Main.prototype.settingApi = function () {
        var _this = this;
        this.app.get('/', function (req, res) {
            res.send('HelloWorld');
        });
        ///////////////////// Portfolio /////////////////////
        this.app.get(this.controller['portfolio'].getUrl(), function (req, res) { return _this.controller['portfolio'].get(req, res); });
        this.app.post(this.controller['portfolio'].getUrl(), function (req, res) { return _this.controller['portfolio'].post(req, res); });
        this.app.put(this.controller['portfolio'].getUrl(), function (req, res) { return _this.controller['portfolio'].update(req, res); });
        ///////////////////// Purchases /////////////////////
        this.app.get(this.controller['purchases'].getUrl(), function (req, res) { return _this.controller['purchases'].get(req, res); });
        this.app.post(this.controller['purchases'].getUrl(), function (req, res) { return _this.controller['purchases'].post(req, res); });
    };
    /**
     * サーバーの開始
     */
    Main.prototype.start = function () {
        // サーバーの開始
        this.app.listen('18456', function () {
            console.log('listen ...');
        });
    };
    return Main;
}());
// メインクラスの実行
var main = new Main();
