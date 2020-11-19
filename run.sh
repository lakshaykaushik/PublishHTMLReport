#!/bin/bash

VERSION='5.3'
./apache-jmeter-${VERSION}/bin/jmeter -n -t test.jmx -l LoadReports\results.jtl -e -o LoadReports
sleep 180