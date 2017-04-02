
/**
 * GoogleFinance 接続パラメータ
 * @class GoogleFinanceEntity
 */
export class GoogleFinanceEntity {
    /**
     * 取得期間
     * ex) 180d
     * @type {string}
     */
    private term :string;

    /**
     * 刻み(sec)
     * ex) 60 * 60 * 24(60秒*60分*24時間 = 1日)
     * @type {number}
     */
    private step :number;

    /**
     * 銘柄コード
     * @type {number}
     */
    private brandCode :number;

    /**
     * 市場
     * ex) TKO (東京市場)
     * @type {string}
     */
    private market :string;

    /**
     * @constructor
     * @param  {string} term      期間
     * @param  {number} step      刻み
     * @param  {number} brandCode 銘柄コード
     * @param  {string} market    市場
     */
    constructor(term :string, step :number, brandCode :number, market :string) {
        this.term = term;
        this.step = step;
        this.brandCode = brandCode;
        this.market = market;
    }

    /**
     * Getter(term)
     * @return {string} term
     */
    public getTerm() :string {
        return this.term;
    }

    /**
     * Getter(step)
     * @return {number} step
     */
    public getStep() :number {
        return this.step;
    }

    /**
     * Getter(brandCode)
     * @return {string} brandCode
     */
    public getBrandCode() :number {
        return this.brandCode;
    }

    /**
     * Getter(market)
     * @return {string} market
     */
    public getMarket() :string {
        return this.market;
    }

    /**
     * Setter(term)
     * @param {string} term
     */
    public setTerm(term :string) :void {
        this.term = term;
    }

    /**
     * Setter(step)
     * @param {number} step
     */
    public setStep(step :number) :void {
        this.step = step;
    }

    /**
     * Setter(brandCode)
     * @param {number} brandCode
     */
    public setBrandCode(brandCode :number) :void {
        this.brandCode = brandCode;
    }

    /**
     * Setter(market)
     * @param {string} market
     */
    public setMarket(market :string) :void {
        this.market = market;
    }
}
