from .get_env import get_env

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'HOST': get_env("MYSQL_HOST", "fnet-mysql"),
        'PORT': get_env("MYSQL_PORT", "3306"),
        'NAME': get_env("MYSQL_DATABASE"),
        'USER': get_env("MYSQL_USER"),
        'PASSWORD': get_env("MYSQL_PASSWORD")
    }
}

DEBUG = False

SECRET_KEY = get_env("DJANGO_SECRET_KEY")

ALLOWED_HOSTS = ["*"]

DATA_DIR = "/data"

CSRF_TRUSTED_ORIGINS = ["https://fgnet.click"]

CORS_ALLOWED_ORIGINS = ["https://fgnet.click"]
CORS_ORIGIN_ALLOW_ALL = False
CORS_ORIGIN_WHITELIST = (
    "https://fgnet.click", 
    "http://localhost:3000"
)