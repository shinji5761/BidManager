-- 市場情報 始値
DROP VIEW IF EXISTS bid_manager.market_open_price;
CREATE VIEW bid_manager.market_open_price AS (
	SELECT brand_code, target_date, open FROM market_info
	WHERE hour = '09' AND min = '00'
);
