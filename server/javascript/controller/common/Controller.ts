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
	 * service
	 * @private
	 * @type {any}
	 */
	protected service :any;

	/**
	 * @constructor
	 * @param {string} url
	 */
	constructor(url :string, service :any) {
		this.url = url;
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
		let key :Object = req.params;
		let body :Object = req.body;
		let query : Object = req.query;
		this.logger.system.info('Controller.get: key=' + JSON.stringify(key));
		this.logger.system.info('Controller.get: body=' + JSON.stringify(body));
		this.logger.system.info('Controller.get: query=' + JSON.stringify(query));

		this.service.get(
			key,
			body,
			query,
			// コールバック(OK)
			(result) => {
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
	 * Query
	 * @param req
	 * @param res
	 */
	public query(req, res) :void {
		this.logger.system.debug('Controller.get: start');
		// パラメータの取得
		let key :Object = req.params;
		let body :Object = req.body;
		let query : Object = req.query;
		this.logger.system.info('Controller.query: key=' + JSON.stringify(key));
		this.logger.system.info('Controller.query: body=' + JSON.stringify(body));
		this.logger.system.info('Controller.query: query=' + JSON.stringify(query));

		this.service.query(
			key,
			body,
			query,
			// コールバック(OK)
			(result) => {
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
		let key :Object = req.params;
		let body :Object = req.body;
		this.logger.system.info('Controller.post: key=' + JSON.stringify(key));
		this.logger.system.info('Controller.post: body=' + JSON.stringify(body));
		this.service.post(
			key,
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
		let key :Object = req.params;
		let body :Object = req.body;
		this.logger.system.info('Controller.put: key=' + JSON.stringify(key));
		this.logger.system.info('Controller.put: body=' + JSON.stringify(body));

		this.service.put(
			key,
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
		let key :Object = req.params;
		let body :Object = req.body;
		this.logger.system.info('Controller.delete: key=' + JSON.stringify(key));
		this.logger.system.info('Controller.delete: body=' + JSON.stringify(body));
		this.service.delete(
			key,
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
}
