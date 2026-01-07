#using apiRouter for better route management

from fastapi import APIRouter
from fastapi import HTTPException
from fastapi.params import Query
from urllib.parse import parse_qs, unquote, urlparse
import ipaddress
import socket
import requests
#importing our currency function we created in utils
from utils.currency import currency_converter
#initializing our router 
router = APIRouter()

@router.get("/")
def converter_route(from_curr: str=Query(description="from Currency must be a 3 letter ISO code"),
                    to_curr: str=Query(description="to currency must be a 3 letter ISO code"),
                    amount: float=Query(description="amount must be a decimal number")):
    return currency_converter(from_curr, to_curr, amount)
