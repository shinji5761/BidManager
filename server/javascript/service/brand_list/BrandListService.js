"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
// === Service ===
var Service_1 = require("../common/Service");
var BrandListService = (function (_super) {
    __extends(BrandListService, _super);
    /**
     * @constructor
     */
    function BrandListService() {
        return _super.call(this) || this;
    }
    /**
     * 検索データ作成処理
     * @override
     * @param  {any}    body ボディデータ
     * @return {Object}      SQLパラメータ
     */
    BrandListService.prototype.createGetParams = function (body) {
        this.logger.system.debug('BrandListService.createGetParams: start');
        var params = {
            'sql': 'SELECT code FROM brand_list',
            'data': []
        };
        return params;
    };
    return BrandListService;
}(Service_1.Service));
exports.BrandListService = BrandListService;
