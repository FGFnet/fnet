from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'fnet',
        'USER': 'fnet',
        'PASSWORD': 'fnet',
        'HOST': '127.0.0.1',
        'PORT': 1398,
    }
}

DEBUG = True

SECRET_KEY = 'django-insecure-8l87s(fcz$l*hni4bs-9)rpdhzrab3=sc(fgz=b5ecau&1k0j9'

ALLOWED_HOSTS = ["*"]

DATA_DIR = f"{BASE_DIR}/data/django"

CSRF_TRUSTED_ORIGINS = ["127.0.0.1:8000", "localhost:8000"]

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = (
    'http://localhost:8000',
    'http://127.0.0.1:8000',
)