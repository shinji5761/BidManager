#!/bin/sh
# === 開発環境用 ===
# node /vagrant/server/batch/build/batch/main.js 90d 86400 TYO

node /vagrant/server/batch/build/batch/main.js 1d 300 TYO

# === 実環境用 ===
# node /home/pi/BidManager/server/batch/build/batch/main.js 90d 86400 TYO
