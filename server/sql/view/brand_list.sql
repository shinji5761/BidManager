-- CREATE BRAND_LIST VIEW
DROP VIEW IF EXISTS bid_manager.brand_list;
CREATE VIEW bid_manager.brand_list AS (
	SELECT DISTINCT brand_code AS brandCode FROM bid_manager.brand
);
