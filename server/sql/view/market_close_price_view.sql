-- 市場情報 高値､安値､出来高
DROP VIEW IF EXISTS bid_manager.market_close_price;
CREATE VIEW bid_manager.market_close_price AS (
	SELECT brand_code, target_date, market_price AS close, date_time FROM market_info_time
	WHERE date_time in (SELECT MAX(date_time) FROM market_info_time GROUP BY brand_code, target_date)
);
