-- CREATE PURCHASES VIEW
CREATE VIEW bid_manager.purchases AS (
	SELECT brand.no, brand.brand_no, brand.code, brand.name, stock.price, stock.stock FROM bid_manager.brand
	INNER JOIN bid_manager.stock ON brand.no = stock.no && brand.brand_no = stock.brand_no && brand.code = stock.code
);
