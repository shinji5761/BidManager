DROP VIEW IF EXISTS bid_manager.brand_view;
CREATE VIEW bid_manager.brand_view AS (
	SELECT b.*, o.market_price, o.target_date FROM brand b, market_price o
	WHERE b.brand_code = o.brand_code
);
