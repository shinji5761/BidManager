-- 市場情報 高値､安値､出来高
DROP VIEW IF EXISTS bid_manager.market_close_price;
CREATE VIEW bid_manager.market_close_price AS (
	SELECT brand_code, target_date, close FROM market_info
	WHERE hour = '15' AND min = '00'
);
