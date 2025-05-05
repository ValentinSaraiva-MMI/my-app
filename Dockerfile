#Create MySQL Image for JSP Tutorial Application
FROM mysql:latest
COPY ./sqlfiles/ /docker-entrypoint-initdb.d
EXPOSE 3306