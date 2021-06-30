python manage.py migrate --no-input
python manage.py collectstatic --no-input
gunicorn coursebackend.wsgi --bind 0.0.0.0:8000 --workers 4 --threads 4