FROM openjdk:12-jdk-oraclelinux7


ARG VERSION="5.3"

COPY apache-jmeter-${VERSION}.tar /opt/
COPY run.sh /
COPY test.jmx /

RUN  tar -xvf /opt/apache-jmeter-${VERSION}.tar





ENTRYPOINT ["/run.sh"]
