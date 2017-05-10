DROP VIEW IF EXISTS bid_manager.market_price;
CREATE VIEW bid_manager.market_price AS 
(
	SELECT brand_code, MAX(target_date) AS new_date, close AS market_price FROM one_day
	GROUP BY brand_code
	ORDER BY target_date ASC
);
