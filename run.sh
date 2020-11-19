#!/bin/bash

./apache-jmeter-5.3/bin/jmeter -n -t test.jmx -l LoadReports\results.jtl -e -o LoadReports
sleep 180