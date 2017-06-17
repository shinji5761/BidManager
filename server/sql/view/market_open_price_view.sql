-- 市場情報 始値
DROP VIEW IF EXISTS bid_manager.market_open_price;
CREATE VIEW bid_manager.market_open_price AS (
	SELECT brand_code, target_date, MIN(hour) AS hour, MIN(min) AS min, open FROM market_info
	GROUP BY brand_code, target_date
	HAVING hour = MIN(hour) AND min = MIN(min)
);
