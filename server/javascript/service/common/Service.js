"use strict";
exports.__esModule = true;
// === Logger ===
var logger = require("../../../LogSettings");
/**
 * Service
 * @class
 */
var Service = (function () {
    /**
     * @constructor
     */
    function Service() {
        this.logger = logger;
    }
    /**
     * 検索条件作成処理
     * 実行するSQLのパラメータを返却する｡
     * @param {any} body ボディデータ
     */
    Service.prototype.createGetParams = function (body) {
        this.logger.system.debug('Service.createGetParams');
        return {};
    };
    /**
     * 追加データ作成処理
     * @param {any} body ボディデータ
     */
    Service.prototype.createPostParams = function (body) {
        this.logger.system.debug('Service.createPostParams');
        return {};
    };
    ;
    /**
     * 追加データ作成処理
     * @param {any} body ボディデータ
     */
    Service.prototype.createPutarams = function (body) {
        this.logger.system.debug('Service.createPutarams');
        return {};
    };
    ;
    /**
     * 削除データ作成処理
     * @param {any} body ボディデータ
     */
    Service.prototype.createDeleteParams = function (body) {
        this.logger.system.debug('Service.createDeleteParams');
        return {};
    };
    ;
    /**
     * 検索条件を付加する
     * @param keys
     * @param params
     */
    Service.prototype.addSearchParam = function (searchParams, params) {
        this.logger.system.debug('Service.addSearchParam');
        var keys = Object.keys(searchParams);
        keys.forEach(function (key, index) {
            if (index < 1) {
                params['sql'] += ' WHERE ' + key + ' = ?';
            }
            else {
                params['sql'] += ' AND ' + key + ' = ?';
            }
            params['data'].push(searchParams[key]);
        });
    };
    /**
     * 検索結果加工処理
     * 加工しない場合はそのままリターン
     * 加工する場合はオーバーライドで処理を記述する｡
     * @public
     * @param {any} data 加工対象のデータ
     * @return {any} 加工データ
     */
    Service.prototype.createResultData = function (data) {
        this.logger.system.debug('Service.createResultData');
        return data;
    };
    return Service;
}());
exports.Service = Service;
