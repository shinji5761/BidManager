#!/bin/sh

####### データベースの構築
## adminユーザーは前もって作っておくこと
echo 'データベースを作成します.....'
mysql -u root < ./sql/setup.sql
echo 'データベースを作成しました'
