FROM python:3.8-alpine
ENV PYTHONUNBUFFERED 1
WORKDIR /app
ADD ./backend/requirements.txt /app/backend/
RUN \
 apk add --no-cache postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
 python3 -m pip install -r backend/requirements.txt --no-cache-dir && \
 apk --purge del .build-deps
ADD ./backend /app/backend
ADD ./docker /app/docker