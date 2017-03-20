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
		this.dao = new dao(service);
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
	 * Before Get
	 * Get前処理
	 * @param req 
	 * @param res 
	 */
	public beforeGet(req, res) :void {
		this.get(req, res);
	}

	/**
	 * Get
	 * @param req 
	 * @param res 
	 */
	public get(req, res) :void {
		// パラメータの取得
		let body :Object = req.body;

		this.dao.get(
			body,
			// コールバック(OK)
			(data) => {
				this.afterGet(req, res, data);
			},
			// コールバック(NG)
			(error, status) => {
				this.isError(error, status, res);
			},this
		);
	}

	/**
	 * After Get
	 * Get後処理
	 * @param req 
	 * @param res 
	 * @param data 
	 */
	public afterGet(req, res, data) :void {
		data = this.service.createResultData(data);
		res.status(200).send(data);
	}

	/**
	 * Before Post
	 * Post前処理
	 * @param req 
	 * @param res 
	 */
	public beforePost(req, res) :void {
		this.post(req, res);

	}

	/**
	 * Post
	 * @param req 
	 * @param res 
	 */
	public post(req, res) :void {
		let body = req.body;
		this.dao.post(
			body,
			(data) => {
				this.afterPost(req, res, data);
			},
			(error, status) => {
				this.isError(error, status, res);
			}
		);
	}

	/**
	 * After Post
	 * Post後処理
	 * @param req 
	 * @param res 
	 * @param data 
	 */
	public afterPost(req, res, data) :void {
		res.status(200).send(data);
	}

	/**
	 * Before Put
	 * Put前処理
	 * @param req 
	 * @param res 
	 */
	public beforePut(req, res) :void {
		console.log('BeforePut');
		this.put(req, res);
	}

	/**
	 * Put
	 * @param req 
	 * @param res 
	 */
	public put(req, res) :void {
		console.log('Put');
		// パラメータの取得
		let body :Object = req.body;

		this.dao.put(
			body,
			// コールバック(OK)
			(data) => {
				this.afterPut(req, res, data);
			},
			// コールバック(NG)
			(error, status) => {
				this.isError(error, status, res);
			}
		)
	}

	/**
	 * After Put
	 * Put後処理
	 * @param req 
	 * @param res 
	 * @param data 
	 */
	public afterPut(req, res, data) :void {
		console.log('AfterPut');
		res.status(200).send(data);
	}

	/**
	 * delete
	 * @param req 
	 * @param res 
	 */
	public delete(req, res) :void {
	}
}

