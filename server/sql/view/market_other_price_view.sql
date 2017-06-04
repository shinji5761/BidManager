-- 市場情報 高値､安値､出来高
DROP VIEW IF EXISTS bid_manager.market_other_price;
CREATE VIEW bid_manager.market_other_price AS (
	SELECT brand_code, target_date, MAX(high) AS high, MIN(low) AS low, SUM(volume) AS volume FROM market_info
	GROUP BY brand_code, target_date
);
