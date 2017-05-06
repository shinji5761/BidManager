DROP VIEW IF EXISTS bid_manager.brand_view;
CREATE VIEW bid_manager.brand_view AS (
	SELECT b.*, o.market_price FROM brand b, market_price o
	WHERE b.brand_code = o.brand_code
);