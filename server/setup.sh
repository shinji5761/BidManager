#!/bin/sh

####### データベースの構築
## adminユーザーは前もって作っておくこと
echo 'データベースを作成します.....'
mysql -u root < ./sql/setup.sql
echo 'データベースを作成しました'

###### 初回データの登録
echo '初回データを登録します...'
mysql -u admin -padmin bid_manager < ./sql/init_data.sql
echo '初回データを登録しました'

##### Viewの作成
echo 'Viewを作成します...'
mysql -u admin -padmin bid_manager < ./sql/view/view_bid_manager.sql
mysql -u admin -padmin bid_manager < ./sql/view/view_purchases.sql
echo 'Viewを作成しました'


###### Functionの作成
echo 'Functionを作成します...'
mysql -u admin -padmin bid_manager < ./sql/function/func_create_purchases.sql
mysql -u admin -padmin bid_manager < ./sql/function/func_delete_purchases.sql
echo 'Functionを作成しました'
