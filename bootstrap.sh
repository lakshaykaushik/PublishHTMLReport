#!/bin/bash

docker rm -f jmeter

VERSION='5.3'
URL=https://archive.apache.org/dist/jmeter/binaries/apache-jmeter-${VERSION}.tgz

curl $URL > apache-jmeter-${VERSION}.tgz
gunzip apache-jmeter-${VERSION}.tgz

docker build . --tag jmeter:latest

rm -rf apache-jmeter-${VERSION}.tar

docker run -d --name jmeter -it jmeter:latest

echo "Generating template files to build extension"
sleep 60

docker cp jmeter:/LoadReports .

docker rm -f jmeter

cp -r LoadReports/sbadmin2-1.0.7 .
cp -r LoadReports/content/css content

rm -rf LoadReports
rm -rf sbadmin2-1.0.7/bower_components/bootstrap/dist/fonts/
rm -rf sbadmin2-1.0.7/bower_components/font-awesome/fonts

npm install
cd publishhtmlreport
npm install
mv node_modules/resolve/.github/workflows/node-4+.yml node_modules/resolve/.github/workflows/node-4.yml




