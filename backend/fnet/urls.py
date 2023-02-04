"""fnet URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('fg.urls.user')),
    path('api/admin/', include('fg.urls.admin')),
    # path('api/', include('freshman.urls.user')),
    # path('api/admin/', include('freshman.urls.admin')),
    path('api/', include('lc.urls.user')),
    path('api/admin/', include('lc.urls.admin')),
    path('api/', include('notice.urls.user')),
    path('api/admin/', include('notice.urls.admin')),
    # path('api/', include('todo.urls.user')),
    # path('api/admin/', include('todo.urls.admin')),
]