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
