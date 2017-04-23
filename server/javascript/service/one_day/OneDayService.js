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
var Service_1 = require("../common/Service");
/**
 *
 */
var OneDayService = (function (_super) {
    __extends(OneDayService, _super);
    function OneDayService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * [createPostParams description]
     * @override
     * @param {any} body ボディデータ
     */
    OneDayService.prototype.createPostParams = function (body) {
        this.logger.system.debug('OneDayService.cratePostParams: start');
        var params = {
            // 'sql': 'INSERT INTO bid_manager.one_day(code, targetDate, open, high, low, close, volume)  VALUES(:code, :targetDate, :open, :high, :low, :close, :volume) ON DUPLICATE KEY UPDATE high = :high, low = :low, close = :close, volume = :volume',
            // 'data': {'code': body.code, 'targetDate': body.targetDate, 'open': body.open, 'high': body.high, 'low': body.low, 'close': body.close, 'volume': body.volume}
            'sql': 'INSERT INTO bid_manager.one_day(code, target_date, open, high, low, close, volume)  VALUES(?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE high=?, low=?, close=?, volume=?',
            'data': [body.code, body.targetDate, body.open, body.high, body.low, body.close, body.volume, body.open, body.high, body.low, body.close, body.volume]
        };
        return params;
    };
    return OneDayService;
}(Service_1.Service));
exports.OneDayService = OneDayService;
