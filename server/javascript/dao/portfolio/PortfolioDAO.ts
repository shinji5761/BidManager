/**
 * @fileoverview PortfolioDao.ts
 * @author shinji5761@gmail.com
 */
import { Dao } from '../common/Dao';

// === Service ===
import { PortfolioService } from '../../service/portfolio/PortfolioService';

/**
 * PortfolioDao
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
