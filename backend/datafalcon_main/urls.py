"""
URL configuration for datafalcon_main project.
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('admin', RedirectView.as_view(url='/admin/', permanent=True)),  # add this
    path('api/v1/', include('api.urls')),
]

if settings.DEBUG or settings.SERVE_MEDIA:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Catch-all: serve the React app for every other route (must stay last)
urlpatterns += [
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]