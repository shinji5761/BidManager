-- 市場情報 高値､安値､出来高
DROP VIEW IF EXISTS bid_manager.market_close_price;
CREATE VIEW bid_manager.market_close_price AS (
	SELECT brand_code, target_date, MAX(hour) AS hour, MAX(min) AS min, close FROM market_info
	GROUP BY brand_code, target_date
	HAVING hour = MAX(hour) AND min = MAX(min)
);
