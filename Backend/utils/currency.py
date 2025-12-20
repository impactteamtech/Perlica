#importing os to get our environment variables
import os 
#loading our environment variables from our .env file so python can see them
from dotenv import load_dotenv 
#importing requests to make http requests to our currency api
import requests 
import re
#loading our env variables
load_dotenv()
currency_api_url = os.getenv("CURRENCY_API_URL")
currency_host = os.getenv("CURRENCY_HOST")
currency_api = os.getenv("CURRENCY_API")
#currency converter logic 
def currency_converter(from_curr: str, to_curr: str, amount: float):
    #validate that the amount is greater than 0
    if not isinstance(amount, (int, float)):
        return {"message": "amount must be a number"}
    if amount <= 0:
        return {"message": "amount must be greater than 0"}
    #validate that the amount is a number 
    if not isinstance(from_curr, str):
        return {"message": "currency must be a string"}
    if not isinstance(to_curr, str):
        return {"message": "currency must be a string"}
    #capitalized currency codes
    from_curr = from_curr.upper()
    to_curr = to_curr.upper()
    #validate that it is a 3letter ISO code
    if not re.fullmatch(r"[A-Z]{3}", from_curr):
        return {"message": "currency must be a 3-digit ISO code"}
    if not re.fullmatch(r"[A-Z]{3}", to_curr):
        return {"message": "currency must be a 3-digit ISO code"}
    #querry string for requests
    querry_string = {"from": from_curr, "to": to_curr, "amount": amount}
    #headers for requests 
    headers = {"x-rapidapi-key": currency_api, "x-rapidapi-host": currency_host}
    #our response we get back from the requests
    response = requests.get(currency_api_url, headers=headers, params=querry_string)
    #returning it in a json format
    data = response.json()
    return {"currency_info": data["query"],"converted_amount": round(data["result"], 2)}