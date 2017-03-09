"use strict";
exports.__esModule = true;
var express = require("express");
var jsonp = require("jsonp-express");
var bodyParser = require("body-parser");
// === API ===
var PortfolioDAO_1 = require("./javascript/dao/portfolio/PortfolioDAO");
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
        this.api = {};
        this.app = express();
        this.api['portfolio'] = new PortfolioDAO_1.PortfolioDAO();
        this.settingMiddleware();
        this.settingApi();
        this.start();
    }
    /**
     * ミドルウェアの設定
     */
    Main.prototype.settingMiddleware = function () {
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.app.use(bodyParser.urlencoded({ 'extended': true }));
        this.app.use(bodyParser.json());
        this.app.use(jsonp);
    };
    ;
    /**
     * APIの設定
     */
    Main.prototype.settingApi = function () {
        var _this = this;
        this.app.get('/', function (req, res) {
            res.send('HelloWorld');
        });
        ///////////////////// Portfolio /////////////////////
        this.app.get(this.api['portfolio'].getUrl(), function (req, res) { return _this.api['portfolio'].get(req, res); });
        this.app.post(this.api['portfolio'].getUrl(), function (req, res) { return _this.api['portfolio'].post(req, res); });
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
