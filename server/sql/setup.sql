-- ALL DELETE
DROP DATABASE IF EXISTS bid_manager;

-- CREATE DATABASE
CREATE DATABASE bid_manager;
GRANT ALL ON bid_manager.* TO admin;


-- CREATE PORTFOLIO TABLE
CREATE TABLE bid_manager.portfolio(
	no INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(30),
	profit INT
);

-- CREATE BRAND TABLE
CREATE TABLE bid_manager.brand(
	no INT NOT NULL,
	code INT NOT NULL,
	name VARCHAR(30),
	PRIMARY KEY (no, code),
	FOREIGN KEY (no) REFERENCES portfolio(no) ON DELETE CASCADE
);

-- CREATE STOCK TABLE
CREATE TABLE bid_manager.stock(
	no INT NOT NULL,
	code INT NOT NULL,
	price INT,
	stock INT,
	FOREIGN KEY (no, code) REFERENCES brand(no, code) ON DELETE CASCADE
);

-- CREATE ONE_DAY TABLE
CREATE TABLE bid_manager.one_day(
	code INT NOT NULL,
	targetDate DATE,
	open FLOAT,
	high FLOAT,
	low FLOAT,
	close FLOAT,
	volume INT,
	PRIMARY KEY (targetDate, code)
);

-- CREATE PURCHASES VIEW
CREATE VIEW bid_manager.purchases AS (
	SELECT brand.no, brand.code, brand.name, stock.price, stock.stock FROM bid_manager.brand
	INNER JOIN bid_manager.stock ON brand.no = stock.no && brand.code = stock.code
);

-- CREATE BRAND_LIST VIEW
CREATE VIEW bid_manager.brand_list AS (
	SELECT DISTINCT code FROM bid_manager.brand
);
