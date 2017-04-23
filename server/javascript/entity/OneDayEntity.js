"use strict";
exports.__esModule = true;
/**
 * 1日足
 * @type {number}
 */
var OneDayEntity = (function () {
    /**
     * @constructor
     * @param  {number} code       [description]
     * @param  {Date} targetDate [description]
     * @param  {number} open       [description]
     * @param  {number} high       [description]
     * @param  {number} low        [description]
     * @param  {number} close      [description]
     * @param  {number} volume     [description]
     */
    function OneDayEntity(code, targetDate, open, high, low, close, volume) {
        this.code = code;
        this.targetDate = targetDate;
        this.open = open;
        this.high = high;
        this.low = low;
        this.close = close;
        this.volume = volume;
    }
    /**
     * Getter(code)
     * @return {number}
     */
    OneDayEntity.prototype.getCode = function () {
        return this.code;
    };
    /**
     * Getter(targetDate)
     * @return {Date} targetDate
     */
    OneDayEntity.prototype.getTargetDate = function () {
        return this.targetDate;
    };
    /**
     * Getter(open)
     * @return {open}
     */
    OneDayEntity.prototype.getOpen = function () {
        return this.open;
    };
    /**
     * Getter(high)
     * @return {high}
     */
    OneDayEntity.prototype.getHigh = function () {
        return this.high;
    };
    /**
     * Getter(low)
     * @return {low}
     */
    OneDayEntity.prototype.getLow = function () {
        return this.low;
    };
    /**
     * Getter(close)
     * @return {close}
     */
    OneDayEntity.prototype.getClose = function () {
        return this.close;
    };
    /**
     * Getter(volume)
     * @return {volume}
     */
    OneDayEntity.prototype.getVolume = function () {
        return this.volume;
    };
    return OneDayEntity;
}());
exports.OneDayEntity = OneDayEntity;
