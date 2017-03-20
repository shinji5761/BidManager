/**
 * @fileoverview PortfolioDao.ts
 * @author shinji5761
 */
import { Dao } from '../common/Dao';

// === Service ===
import { PortfolioService } from '../../service/portfolio/PortfolioService';


// === Entity ==
import { Portfolio } from '../../entity/portfolio';

/**
 * ポートフォリオクラス
 * @class {PortfolioDao} PortfolioDao
 */
export class PortfolioDao extends Dao {

	/**
	 * @constructor
	 */
	constructor(){
		super(PortfolioService);
	};

}