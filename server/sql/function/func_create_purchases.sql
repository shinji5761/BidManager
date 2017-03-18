DROP FUNCTION IF EXISTS func_create_purchases;

DELIMITER //
CREATE FUNCTION func_create_purchases(p_no INT, p_code INT,p_price INT, p_stock INT)
RETURNS INT DETERMINISTIC
BEGIN
	-- Brandの追加
	INSERT INTO brand(no, code) VALUES(p_no, p_code) ON DUPLICATE KEY UPDATE no = p_no, code = p_code;
	-- Stockの追加
	INSERT INTO stock(no, code, price, stock) VALUES(p_no, p_code, p_price, p_stock);
	RETURN(0);
END;
//
