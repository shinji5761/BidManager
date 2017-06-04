#!/bin/sh

####### データベースの構築
## adminユーザーは前もって作っておくこと
echo 'データベースを作成します.....'
mysql -u root -pinfinite33 < ./sql/setup.sql
echo 'データベースを作成しました'

######  テーブルの作成
echo 'テーブルを作成します...'
mysql -u admin -padmin bid_manager < ./sql/table/table_portfolio.sql
mysql -u admin -padmin bid_manager < ./sql/table/table_brand.sql
mysql -u admin -padmin bid_manager < ./sql/table/table_one_day.sql
mysql -u admin -padmin bid_manager < ./sql/table/table_market_info.sql
echo 'テーブルを作成しました'


##### ビューの作成
echo 'ビューを作成します...'
# mysql -u admin -padmin bid_manager < ./sql/view/portfolio_list.sql
mysql -u admin -padmin bid_manager < ./sql/view/brand_list.sql
mysql -u admin -padmin bid_manager < ./sql/view/market_open_price_view.sql
mysql -u admin -padmin bid_manager < ./sql/view/market_close_price_view.sql
mysql -u admin -padmin bid_manager < ./sql/view/market_other_price_view.sql
mysql -u admin -padmin bid_manager < ./sql/view/market_one_day_info_view.sql
mysql -u admin -padmin bid_manager < ./sql/view/market_price.sql
mysql -u admin -padmin bid_manager < ./sql/view/brand_view.sql
echo 'ビューを作成しました'

###### 初回データの登録
echo '初回データを登録します...'
mysql -u admin -padmin bid_manager < ./sql/init_data.sql
echo '初回データを登録しました'
