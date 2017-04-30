CREATE TABLE one_day (
	brand_code INT NOT NULL,	-- 銘柄コード
	target_date DATE NOT NULL,	-- 対象日
	open FLOAT,					-- 始値
	high FLOAT,					-- 高値
	low FLOAT,					-- 安値
	close FLOAT,				-- 終値
	volume INT,					-- 出来高
	PRIMARY KEY (brand_code, target_date)
);
