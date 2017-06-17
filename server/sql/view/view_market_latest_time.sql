--
DROP VIEW IF EXISTS bid_manager.market_latest_time;
CREATE VIEW bid_manager.market_latest_time AS (
	SELECT brand_code, MAX(CONCAT(target_date, ' ', hour, ':', min)) AS date
	FROM market_info
	GROUP BY brand_code
);
