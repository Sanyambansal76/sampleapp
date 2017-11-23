import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DEBUG = False

DATABASES = {
    'default': {
           'ENGINE': 'django.db.backends.sqlite3',
           'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

if not DEBUG:
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
else:
    STATICFILES_DIRS = [
        os.path.join(BASE_DIR, "static"),
    ]
