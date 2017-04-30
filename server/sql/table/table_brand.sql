DROP TABLE IF EXISTS brand;
CREATE TABLE brand(
	brand_no INT NOT NULL AUTO_INCREMENT,
	portfolio_no INT NOT NULL,
	brand_code INT,						-- 銘柄コード
	brand_name VARCHAR(20),				-- 銘柄名
	price FLOAT,						-- 価格
	stock FLOAT,						-- 保有株
	PRIMARY KEY(brand_no, portfolio_no),
	FOREIGN KEY(portfolio_no) REFERENCES portfolio(portfolio_no) ON DELETE CASCADE
);
