DROP VIEW IF EXISTS bid_manager.market_price;
CREATE VIEW bid_manager.market_price AS
(
	SELECT market_info_time.brand_code, market_info_time.target_date, market_info_time.market_price FROM bid_manager.market_latest_time
	INNER JOIN bid_manager.market_info_time
	ON market_latest_time.date = market_info_time.date_time AND market_latest_time.brand_code = market_info_time.brand_code
);
