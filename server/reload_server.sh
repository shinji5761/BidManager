#/bin/sh
#### サーバーの再起動 ###
tsc server --module commonjs --outDir ./build --allowJs 
sudo node ./build/server.js
