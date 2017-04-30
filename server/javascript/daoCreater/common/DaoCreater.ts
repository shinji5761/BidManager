// === Dao ===
import { PortfolioDao } from '../../dao/portfolio/PortfolioDAO';

/**
 * @interface DaoCreater
 */
export interface DaoCreater {
	/**
	 * PortfolioDao 取得
	 * @return {PortfolioDao}
	 */
	getPortfolioDao() :PortfolioDao;
}
