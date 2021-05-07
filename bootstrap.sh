#!/bin/bash


# Remove existing jmeter container if present
docker rm -f jmeter


# Set jmeter version the extension should support
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
mkdir -p content
cp -r LoadReports/content/css content/css
cp LoadReports/content/js/jquery.tablesorter.min.js .

rm -rf LoadReports
# Remove some unsupported fonts by azdo
#   Delete the svg only so that it would render font-awsome properly
rm -rf sbadmin2-1.0.7/bower_components/bootstrap/dist/fonts/*.svg
rm -rf sbadmin2-1.0.7/bower_components/font-awesome/fonts/*.svg


# Run npm install
npm install
cd publishhtmlreport
npm install
# Rename unsupported file name
mv node_modules/resolve/.github/workflows/node-4+.yml node_modules/resolve/.github/workflows/node-4.yml


## After Running bootstrap.sh, the repo is ready to be built. Do the usual npm run build to generate the vsix after updating the version number




