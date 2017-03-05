
-- PORTFOLIO DATA
INSERT INTO portfolio(no, name) VALUES(1, '持株');
INSERT INTO portfolio(no, name) VALUES(2, 'お気に入り');


-- BRAND DATA
INSERT INTO brand(no, code, name) VALUES(1, 6752, 'パナソニック');
INSERT INTO brand(no, code, name) VALUES(2, 2193, 'クックパッド');
INSERT INTO brand(no, code, name) VALUES(2, 6752, 'パナソニック');


-- STOCK
INSERT INTO stock(no, code, price, stock) VALUES(1, 6752, 1000, 100);
INSERT INTO stock(no, code, price, stock) VALUES(1, 6752, 1200, 200);
INSERT INTO stock(no, code, price, stock) VALUES(2, 2193, 0, 0);
INSERT INTO stock(no, code, price, stock) VALUES(2, 6752, 0, 0);

-- ONE_DAY
INSERT INTO one_day(code, targetDate, open, high, low, close, volume) VALUES(6752, '2017-03-01', 1200, 1300, 1000, 1100, 20000);
INSERT INTO one_day(code, targetDate, open, high, low, close, volume) VALUES(6752, '2017-03-02', 1200, 1300, 1000, 1100, 20000);
INSERT INTO one_day(code, targetDate, open, high, low, close, volume) VALUES(6752, '2017-03-03', 1200, 1300, 1000, 1100, 20000);
INSERT INTO one_day(code, targetDate, open, high, low, close, volume) VALUES(2193, '2017-03-01', 1200, 1300, 1000, 1100, 20000);
INSERT INTO one_day(code, targetDate, open, high, low, close, volume) VALUES(2193, '2017-03-02', 1200, 1300, 1000, 1100, 20000);
INSERT INTO one_day(code, targetDate, open, high, low, close, volume) VALUES(2193, '2017-03-03', 1200, 1300, 1000, 1100, 20000);
