-- 市場情報 1日足
DROP VIEW IF EXISTS bid_manager.market_one_day_info;
CREATE VIEW bid_manager.market_one_day_info AS (
	SELECT open.brand_code, open.target_date, open, high, low, close, volume
	FROM market_open_price AS open
	INNER JOIN market_close_price AS close
	ON open.target_date = close.target_date
	AND open.brand_code = close.brand_code
	INNER JOIN market_other_price AS other
	ON open.target_date = other.target_date
	AND open.brand_code = other.brand_code
);
