
rmdir /s /q output
node r.js -o build.js
node r.js -o cssIn=../css/styles.css out=output/css/styles.css

:: Copy static files
mkdir output\img
copy ..\index.html output\
copy ..\404.html output\
copy ..\favicon.ico output\
copy ..\img\ output\img\
