#!/bin/bash
rm -rf output
node r.js -o build.js
node r.js -o cssIn=../css/styles.css out=output/css/styles.css

# Copy static files
mkdir output/img
mkdir output/js/vendor
cp ../index.html output/
cp ../js/vendor/require.js output/js/vendor/
cp ../404.html output/
cp ../favicon.ico output/
cp ../img/* output/img/
