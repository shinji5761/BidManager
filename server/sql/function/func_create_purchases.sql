DROP FUNCTION IF EXISTS func_create_purchases;

DELIMITER //
CREATE FUNCTION func_create_purchases(p_no INT, p_brand_no INT, p_code INT, p_name VARCHAR(30), p_price INT, p_stock INT)
RETURNS INT DETERMINISTIC
BEGIN
	-- Brandの追加
	INSERT INTO brand(no, brand_no, code, name) VALUES(p_no, p_brand_no, p_code, p_name)
	ON DUPLICATE KEY UPDATE no = p_no, brand_no = p_brand_no, code = p_code;
	-- Stockの追加
	INSERT INTO stock(no, brand_no, code, price, stock) VALUES(p_no, p_brand_no, p_code, p_price, p_stock)
	ON DUPLICATE KEY UPDATE no = p_no, brand_no = p_brand_no, code = p_code, price = p_price;
	RETURN(0);
END;
//
