DROP VIEW IF EXISTS bid_manager.market_price;
CREATE VIEW bid_manager.market_price AS
(
	SELECT brand_code, target_date, close AS market_price FROM one_day
	WHERE target_date = (SELECT MAX(target_date) FROM one_day)
);
