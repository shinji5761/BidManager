/**
 * @fileoverview PortfolioDao.ts
 * @author shinji5761@gmail.com
 */
import { Dao } from '../common/Dao';

// === Service ===
import { PurchasesService } from '../../service/purchases/PurchasesService';


/**
 * ポートフォリオクラス
 * @class {PurchasesDao} PurchasesDao
 * @extends Dao
 */
export class PurchasesDao extends Dao {

	/**
	 * @constructor
	 */
	constructor(){
		super(PurchasesService);
	};
}