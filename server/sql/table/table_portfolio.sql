CREATE TABLE portfolio (
	portfolio_no INT NOT NULL,		-- ポートフォリオ番号
	portfolio_name VARCHAR(20),						-- ポートフォリオ名
	brand_code INT,									-- 銘柄コード
	brand_name VARCHAR(20),							-- 銘柄名
	price FLOAT,									-- 価格
	stock float									-- 保有株
);
