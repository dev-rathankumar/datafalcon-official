"""
URL configuration for datafalcon_main project.
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView

from .views import SPAView, serve_dist_root_file

urlpatterns = [
    path('admin/', admin.site.urls),
    path('admin', RedirectView.as_view(url='/admin/', permanent=True)),  # add this
    path('api/v1/', include('api.urls')),
    path('favicon.svg', serve_dist_root_file, {'filename': 'favicon.svg'}),
    path('favicon.ico', serve_dist_root_file, {'filename': 'favicon.ico'}),
    path('favicon-32.png', serve_dist_root_file, {'filename': 'favicon-32.png'}),
    path('apple-touch-icon.png', serve_dist_root_file, {'filename': 'apple-touch-icon.png'}),
]

if settings.DEBUG or settings.SERVE_MEDIA:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Catch-all: serve the React app for every other route (must stay last)
urlpatterns += [
    re_path(r'^.*$', SPAView.as_view()),
]