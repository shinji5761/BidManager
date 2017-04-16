-- CREATE BRAND_LIST VIEW
CREATE VIEW bid_manager.brand_list AS (
	SELECT DISTINCT code FROM bid_manager.brand
);
