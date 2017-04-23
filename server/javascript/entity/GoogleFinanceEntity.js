"use strict";
exports.__esModule = true;
/**
 * GoogleFinance 接続パラメータ
 * @class GoogleFinanceEntity
 */
var GoogleFinanceEntity = (function () {
    /**
     * @constructor
     * @param  {string} term      期間
     * @param  {number} step      刻み
     * @param  {number} brandCode 銘柄コード
     * @param  {string} market    市場
     */
    function GoogleFinanceEntity(term, step, brandCode, market) {
        this.term = term;
        this.step = step;
        this.brandCode = brandCode;
        this.market = market;
    }
    /**
     * Getter(term)
     * @return {string} term
     */
    GoogleFinanceEntity.prototype.getTerm = function () {
        return this.term;
    };
    /**
     * Getter(step)
     * @return {number} step
     */
    GoogleFinanceEntity.prototype.getStep = function () {
        return this.step;
    };
    /**
     * Getter(brandCode)
     * @return {string} brandCode
     */
    GoogleFinanceEntity.prototype.getBrandCode = function () {
        return this.brandCode;
    };
    /**
     * Getter(market)
     * @return {string} market
     */
    GoogleFinanceEntity.prototype.getMarket = function () {
        return this.market;
    };
    /**
     * Setter(term)
     * @param {string} term
     */
    GoogleFinanceEntity.prototype.setTerm = function (term) {
        this.term = term;
    };
    /**
     * Setter(step)
     * @param {number} step
     */
    GoogleFinanceEntity.prototype.setStep = function (step) {
        this.step = step;
    };
    /**
     * Setter(brandCode)
     * @param {number} brandCode
     */
    GoogleFinanceEntity.prototype.setBrandCode = function (brandCode) {
        this.brandCode = brandCode;
    };
    /**
     * Setter(market)
     * @param {string} market
     */
    GoogleFinanceEntity.prototype.setMarket = function (market) {
        this.market = market;
    };
    /**
     * GoogleFinance URL クエリパラメータ 作成処理
     * @return {string} クエリパラメータ
     */
    GoogleFinanceEntity.prototype.createQueryParams = function () {
        var param = 'p=' + this.term + '&' +
            'i=' + this.step + '&' +
            'q=' + this.brandCode + '&' +
            'x=' + this.market + '&' +
            'f=d,c,h,l,o,v';
        return param;
    };
    return GoogleFinanceEntity;
}());
exports.GoogleFinanceEntity = GoogleFinanceEntity;
