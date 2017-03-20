import { Controller } from '../common/Controller';

// === Dao ===
import { PortfolioDao } from '../../dao/portfolio/PortfolioDao';
import { PurchasesDao } from '../../dao/purchases/PurchasesDao';

// === Service ===
import { PortfolioService } from '../../service/portfolio/PortfolioService';

/**
 * PortfolioController
 * @class
 * @extends Controller
 */
export class PortfolioController extends Controller {

	/**
	 * 購入物Dao
	 */
	private purchasesDao :PurchasesDao;

	/**
	 * @constructor
	 */
	constructor() {
		super('/portfolio', PortfolioDao, PortfolioService);
		this.purchasesDao = new PurchasesDao();
	}

	/**
	 * After Put
	 * Put後処理｡
	 * 更新したポートフォリオの購入データをすべて削除する｡
	 * @param req
	 * @param res 
	 * @param data 
	 */
	public afterPut(req, res, data) :void {
		console.log('PortfolioController AfterPut');
		let body = req.body;
		this.purchasesDao.delete(
			body,
			(data) => {
				res.status(200).send(data);
			}, 
			(error, status) => {
				this.isError(error, status, res);
			}, this
		)
	}
}