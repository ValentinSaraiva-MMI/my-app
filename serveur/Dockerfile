FROM python:3.9

WORKDIR /serveur
COPY ./ /serveur/

RUN pip install mysql-connector-python \
    fastapi \
    uvicorn

EXPOSE 8000
CMD uvicorn server:app \ --proxy-headers --host 0.0.0.0 --port 8000