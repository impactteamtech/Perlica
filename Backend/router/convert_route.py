#using apiRouter for better route management

from fastapi import APIRouter
from fastapi import HTTPException
from fastapi.params import Query
from fastapi.responses import RedirectResponse
from utils.url_resolver import resolve_final_url
from utils.currency import currency_converter
#initializing our router 
router = APIRouter()

@router.get("/")
def converter_route(from_curr: str=Query(description="from Currency must be a 3 letter ISO code"),
                    to_curr: str=Query(description="to currency must be a 3 letter ISO code"),
                    amount: float=Query(description="amount must be a decimal number")):
    return currency_converter(from_curr, to_curr, amount)


@router.get("/resolve-url")
def resolve_url(url: str = Query(..., description="URL to resolve (follows redirects)", min_length=1)):

    raw = (url or "").strip()
    if not raw:
        raise HTTPException(status_code=400, detail="Missing url")

    resolved = resolve_final_url(raw, timeout_s=8, max_redirects=10)
    if resolved is None:
        raise HTTPException(status_code=400, detail="Unsafe or invalid URL")

    return {"url": resolved}


@router.get("/open-url")
def open_url(url: str = Query(..., description="URL to resolve and redirect to", min_length=1)):
    """Resolve a URL and redirect the client to the final destination.

    This is useful for browser navigation (open in new tab) because it avoids popup blockers
    and does not require client-side fetch/CORS.
    """

    raw = (url or "").strip()
    if not raw:
        raise HTTPException(status_code=400, detail="Missing url")

    resolved = resolve_final_url(raw, timeout_s=8, max_redirects=10)
    if resolved is None:
        raise HTTPException(status_code=400, detail="Unsafe or invalid URL")

    return RedirectResponse(url=resolved, status_code=307)
