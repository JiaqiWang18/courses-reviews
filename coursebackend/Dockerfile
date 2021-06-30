FROM python:3.8-alpine
ENV PYTHONUNBUFFERED 1
WORKDIR /coursebackend
COPY requirements.txt requirements.txt
RUN \
 apk add --no-cache postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
 python3 -m pip install -r requirements.txt --no-cache-dir && \
 apk --purge del .build-deps
COPY . .
ENTRYPOINT [ "sh", "./entrypoint.sh" ]