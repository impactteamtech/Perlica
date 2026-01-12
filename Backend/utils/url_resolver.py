from __future__ import annotations

from urllib.parse import parse_qs, unquote, urlparse
import ipaddress
import socket
from typing import Optional

import requests


def extract_google_redirect_target(raw_url: str) -> str:
    try:
        parsed = urlparse(raw_url)
    except Exception:
        return raw_url

    host = (parsed.hostname or "").lower()
    path = (parsed.path or "").lower()
    if "google." not in host or not path.startswith("/url"):
        return raw_url

    qs = parse_qs(parsed.query or "")
    candidate = (qs.get("q") or qs.get("url") or [""])[0]
    if not candidate:
        return raw_url

    try:
        return unquote(candidate)
    except Exception:
        return candidate


def is_safe_public_destination(url: str) -> bool:
    try:
        parsed = urlparse(url)
    except Exception:
        return False

    if parsed.scheme not in ("http", "https"):
        return False

    hostname = parsed.hostname
    if not hostname:
        return False

    lowered = hostname.lower()
    if lowered == "localhost" or lowered.endswith(".localhost"):
        return False

    def is_private_ip(ip_str: str) -> bool:
        try:
            ip = ipaddress.ip_address(ip_str)
        except ValueError:
            return True
        return bool(
            ip.is_private
            or ip.is_loopback
            or ip.is_link_local
            or ip.is_multicast
            or ip.is_reserved
            or ip.is_unspecified
        )

    # If hostname is an IP, validate directly.
    try:
        ipaddress.ip_address(hostname)
        return not is_private_ip(hostname)
    except ValueError:
        pass

    # Otherwise resolve DNS and ensure all resolved addresses are public.
    try:
        infos = socket.getaddrinfo(hostname, None)
        resolved_ips = {info[4][0] for info in infos if info and info[4]}
        if not resolved_ips:
            return False
        return all(not is_private_ip(ip) for ip in resolved_ips)
    except Exception:
        return False


def follow_redirects(url: str, timeout_s: int = 8, max_redirects: int = 10) -> str:
    session = requests.Session()
    session.max_redirects = max_redirects

    headers = {
        "User-Agent": "PerlicaBot/1.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    }

    # Use GET with stream=True so we don't download full bodies.
    resp = session.get(
        url,
        allow_redirects=True,
        timeout=timeout_s,
        headers=headers,
        stream=True,
    )
    try:
        return (resp.url or url).strip()
    finally:
        resp.close()
        session.close()


def resolve_final_url(
    raw_url: str,
    *,
    timeout_s: int = 8,
    max_redirects: int = 10,
) -> Optional[str]:
    """Resolve a URL to its final destination.

    Returns the resolved URL if it appears safe/public; otherwise returns None.
    """
    if not isinstance(raw_url, str):
        return None

    raw = raw_url.strip()
    if not raw:
        return None

    # First unwrap simple google.com/url wrappers if present.
    candidate = (extract_google_redirect_target(raw).strip() or raw).strip()

    if not is_safe_public_destination(candidate):
        return None

    try:
        resolved = follow_redirects(candidate, timeout_s=timeout_s, max_redirects=max_redirects)
    except requests.TooManyRedirects:
        resolved = candidate
    except requests.RequestException:
        resolved = candidate

    final = (resolved or candidate).strip()
    if not final:
        return None

    # One more unwrap in case we landed on another google.com/url wrapper.
    final_unwrapped = (extract_google_redirect_target(final).strip() or final).strip()
    if not final_unwrapped:
        return None

    # Final safety check: must be public and must NOT be a Google domain.
    if not is_safe_public_destination(final_unwrapped):
        return None

    try:
        final_host = (urlparse(final_unwrapped).hostname or "").lower()
    except Exception:
        return None

    if "google." in final_host:
        return None

    return final_unwrapped
