DROP VIEW IF EXISTS bid_manager.market_price;
CREATE VIEW bid_manager.market_price AS
(
	SELECT brand_code, target_date, close AS market_price FROM market_one_day_info
	WHERE target_date = (SELECT MAX(target_date) FROM market_one_day_info)
);
