import os
DEBUG = False


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ['DBNAME'],
        'USER': os.environ['DBUSER'],
        'PASSWORD': os.environ['DBPASSWORD'],
        'HOST': os.environ['DBHOST'],
        'PORT': os.environ['DBPORT'],
    }
}

if not DEBUG:
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
else:
    STATICFILES_DIRS = [
        os.path.join(BASE_DIR, "static"),
    ]
