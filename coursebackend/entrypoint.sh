python manage.py collectstatic --no-input && gunicorn coursebackend.wsgi -b 0.0.0.0:8000