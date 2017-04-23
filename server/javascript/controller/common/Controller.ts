import logger = require('../../../LogSettings');

/**
 * Controller
 * @class
 */
export abstract class Controller {
	/**
	 * ログ
	 * @type {any}
	 */
	protected logger :any;

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
		this.dao = new dao(service);
		this.service = new service();
		this.logger = logger;
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
		this.logger.system.error('Controller.isError: status: ' + status + ', message: ' + eMessage);
		response.status(status).send(eMessage);
	}

	/**
	 * Get
	 * @param req
	 * @param res
	 */
	public get(req, res) :void {
		this.logger.system.debug('Controller.get: start');
		// パラメータの取得
		let body :Object = req.body;
		// パラメータを加工する
		this.createBody(body, req);
		this.logger.system.info('Controller.get: body - ' + JSON.stringify(body));

		this.dao.get(
			body,
			// コールバック(OK)
			(data) => {
				let result = this.service.createResultData(data);
				this.logger.system.info(JSON.stringify(result));
				res.status(200).send(result);
			},
			// コールバック(NG)
			(error, status) => {
				this.isError(error, status, res);
			},this
		);
	}

	/**
	 * Post
	 * @param req
	 * @param res
	 */
	public post(req, res) :void {
		this.logger.system.debug('Controller.post: start');
		// パラメータの取得
		let body :Object = req.body;
		// パラメータを加工する
		this.createBody(body, req);
		this.logger.system.info('Controller.post: ' + JSON.stringify(body));
		this.dao.post(
			body,
			(data) => {
				res.status(200).send(data);
			},
			(error, status) => {
				this.isError(error, status, res);
			}
		);
	}

	/**
	 * Put
	 * @param req
	 * @param res
	 */
	public put(req, res) :void {
		this.logger.system.debug('Controller.put: start');
		// パラメータの取得
		let body :Object = req.body;
		// パラメータを加工する
		this.createBody(body, req);
		this.logger.system.info('Controller.put: ' + JSON.stringify(body));

		this.dao.put(
			body,
			// コールバック(OK)
			(data) => {
				res.status(200).send(data);
			},
			// コールバック(NG)
			(error, status) => {
				this.isError(error, status, res);
			}
		)
	}


	/**
	 * Delete
	 * @param req
	 * @param res
	 * @return {void}
	 */
	public delete(req, res) :void {
		this.logger.system.debug('Controller.delete: start');
		// パラメータの取得
		let body :Object = req.body;
		// パラメータを加工する
		this.createBody(body, req);
		this.logger.system.info('Controller.delete: ' + JSON.stringify(body));
		this.dao.delete(
			body,
			// コールバック(OK)
			(data) => {
				res.status(200).send(data);
			},
			// コールバック(NG)
			(error, status) => {
				this.isError(error, status, res);
			}
		)
	}

	/**
	 * リクエストボディ 加工処理
	 * @param body
	 * @param req
	 */
	protected createBody(body, req) :void {

	}
}
