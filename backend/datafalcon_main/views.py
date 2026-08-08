from django.conf import settings
from django.http import FileResponse, Http404
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic import TemplateView

DIST_ROOT = settings.BASE_DIR.parent / "frontend" / "dist"

CONTENT_TYPES = {
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".ico": "image/x-icon",
}


def serve_dist_root_file(request, filename):
    path = (DIST_ROOT / filename).resolve()
    if not str(path).startswith(str(DIST_ROOT.resolve())) or not path.is_file():
        raise Http404
    return FileResponse(
        open(path, "rb"),
        content_type=CONTENT_TYPES.get(path.suffix.lower(), "application/octet-stream"),
    )


@method_decorator(ensure_csrf_cookie, name="dispatch")
@method_decorator(never_cache, name="dispatch")
class SPAView(TemplateView):
    template_name = "index.html"
