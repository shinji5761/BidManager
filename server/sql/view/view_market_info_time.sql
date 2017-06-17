DROP VIEW IF EXISTS bid_manager.market_info_time;
CREATE VIEW market_info_time AS (
	SELECT market_info.brand_code, market_info.target_date, market_info.close as market_price, CONCAT(market_info.target_date, ' ', market_info.hour, ':', market_info.min) AS date_time
	FROM market_info
);
