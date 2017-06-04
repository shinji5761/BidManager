-- テーブル 市場情報(5分足)
DROP TABLE IF EXISTS market_info;
CREATE TABLE market_info(
	brand_code	INT,
	target_date	DATE,
	hour		VARCHAR(2),
	min			VARCHAR(2),
	open		FLOAT,
	high		FLOAT,
	low			FLOAT,
	close		FLOAT,
	volume		INT,
	PRIMARY KEY (brand_code, target_date, hour, min)
);
