DROP VIEW IF EXISTS bid_manager.portfolio_list;
CREATE VIEW bid_manager.portfolio_list AS
SELECT DISTINCT
	portfolio_no AS portfolioNo,		-- ポートフォィオ番号
	portfolio_name AS portfolioName		-- ポートフォリオ名
FROM portfolio
ORDER BY portfolioNo;
