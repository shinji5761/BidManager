/**
 * @fileoverview PortfolioDao.ts
 * @author shinji5761@gmail.com
 */
import { Dao } from '../common/Dao';

// === Manager ===
import { PortfolioManager } from '../../manager/portfolio/PortfolioManager';


/**
 * PortfolioDao
 * @class {PortfolioDao} PortfolioDao
 */
export class PortfolioDao extends Dao {

	/**
	 * @constructor
	 */
	constructor(connection){
		super(connection, PortfolioManager);
	};

}
