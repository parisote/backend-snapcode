FROM postgres
ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB snapcode
COPY snapcode.sql /docker-entrypoint-initdb.d/