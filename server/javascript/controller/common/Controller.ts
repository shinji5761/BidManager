/**
 * Controller
 * @class
 */
export class Controller {
	/**
	 * URL
	 * @private
	 * @type {string}
	 */
	protected url :string = '';

	/**
	 * dao
	 * @private 
	 * @type {any}
	 */
	protected dao :any;

	/**
	 * service
	 * @private 
	 * @type {any}
	 */
	protected service :any;

	/**
	 * @constructor
	 * @param {string} url 
	 */
	constructor(url :string, dao :any, service :any) {
		this.url = url;
		this.dao = new dao();
		this.service = new service();
	}

	/**
	 * Getter(url)
	 * @return {string} url
	 */
	public getUrl() :string {
		return this.url;
	}

	/**
	 * Getter(dao)
	 * @return {any} dao
	 */
	public getDao() :any {
		return this.dao;
	}

	/**
	 * Getter(service)
	 * @return {any} service
	 */
	public getService() :any {
		return this.service;
	}

	/**
	 * エラー処理
	 * @param {string} eMessage
	 * @param {number} status 
	 */
	public isError(eMessage, status, response) :void {
		response.status(status).send(eMessage);
	}


	/**
	 * get
	 * @param req 
	 * @param res 
	 */
	public get(req, res) :void {
	}

	/**
	 * post
	 * @param req 
	 * @param res 
	 */
	public post(req, res) :void {
	}

	/**
	 * update
	 * @param req 
	 * @param res 
	 */
	public update(req, res) :void {
	}

	/**
	 * delete
	 * @param req 
	 * @param res 
	 */
	public delete(req, res) :void {
	}
}

