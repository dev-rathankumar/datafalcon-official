from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic import TemplateView


@method_decorator(ensure_csrf_cookie, name="dispatch")
@method_decorator(never_cache, name="dispatch")
class SPAView(TemplateView):
    template_name = "index.html"
