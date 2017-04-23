DROP FUNCTION IF EXISTS func_delete_purchases;

DELIMITER //
CREATE FUNCTION func_delete_purchases(p_no INT)
RETURNS INT DETERMINISTIC
BEGIN
	-- Stockの追加
	DELETE FROM stock WHERE no = p_no;

	-- Brandの削除
	DELETE FROM brand WHERE no = p_no;

	RETURN(0);
END;
//
