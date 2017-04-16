-- ALL DELETE
DROP DATABASE IF EXISTS bid_manager;

-- CREATE DATABASE
CREATE DATABASE bid_manager;
GRANT ALL ON bid_manager.* TO admin;


-- CREATE PORTFOLIO TABLE
CREATE TABLE bid_manager.portfolio(
	no INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(30),
	profit INT,
	PRIMARY KEY (no)
);

-- CREATE BRAND TABLE
CREATE TABLE bid_manager.brand(
	no INT NOT NULL,
	brand_no INT NOT NULL,
	code INT NOT NULL,
	name VARCHAR(30),
	PRIMARY KEY (brand_no, no, code),
	FOREIGN KEY (no) REFERENCES portfolio(no) ON DELETE CASCADE
);

-- CREATE STOCK TABLE
CREATE TABLE bid_manager.stock(
	no INT NOT NULL,
	brand_no INT NOT NULL,
	code INT NOT NULL,
	price INT,
	stock INT,
	PRIMARY KEY(no, brand_no, code),
	FOREIGN KEY (no, brand_no, code) REFERENCES brand(no, brand_no, code) ON DELETE CASCADE
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
