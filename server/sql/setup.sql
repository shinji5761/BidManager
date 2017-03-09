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
	no INT,
	code INT NOT NULL,
	name VARCHAR(30)
);

-- CREATE STOCK TABLE
CREATE TABLE bid_manager.stock(
	no INT NOT NULL,
	code INT NOT NULL,
	price INT,
	stock INT
);

-- CREATE ONE_DAY TABLE
CREATE TABLE bid_manager.one_day(
	code INT NOT NULL,
	targetDate DATE,
	open FLOAT,
	high FLOAT,
	low FLOAT,
	close FLOAT,
	volume INT 
);
