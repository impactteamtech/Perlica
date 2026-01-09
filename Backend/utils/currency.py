import os 
from dotenv import load_dotenv 
import requests 
import re
import time

# Loading our env variables
load_dotenv()
currency_api_url = os.getenv("CURRENCY_URL")
currency_host = os.getenv("CURRENCY_HOST")
currency_api = os.getenv("CURRENCY_API")

# Check if environment variables are loaded
print(f"DEBUG: API URL: {currency_api_url}")
print(f"DEBUG: API Host: {currency_host}")
print(f"DEBUG: API Key exists: {bool(currency_api)}")

# Currency converter logic 
def currency_converter(from_curr: str, to_curr: str, amount: float):
    print(f"DEBUG: Converting {amount} {from_curr} to {to_curr}")
    
    # Validate amount
    if not isinstance(amount, (int, float)):
        return {"error": "Amount must be a number"}
    if amount <= 0:
        return {"error": "Amount must be greater than 0"}
    
    # Validate currencies
    if not isinstance(from_curr, str):
        return {"error": "From currency must be a string"}
    if not isinstance(to_curr, str):
        return {"error": "To currency must be a string"}
    
    # Capitalized currency codes
    from_curr = from_curr.upper()
    to_curr = to_curr.upper()
    
    # Validate that it is a 3-letter ISO code
    if not re.fullmatch(r"[A-Z]{3}", from_curr):
        return {"error": f"Currency '{from_curr}' must be a 3-letter ISO code"}
    if not re.fullmatch(r"[A-Z]{3}", to_curr):
        return {"error": f"Currency '{to_curr}' must be a 3-letter ISO code"}
    
    # Check if API credentials are available
    if not currency_api:
        print("WARNING: Using mock conversion - no API key found")
        # Return mock data for testing
        mock_rates = {
            "USD": {"KES": 150.50, "EUR": 0.92, "GBP": 0.79, "TZS": 2500, "UGX": 3700},
            "KES": {"USD": 0.0066, "EUR": 0.0061, "GBP": 0.0052},
            "EUR": {"USD": 1.09, "KES": 164.67, "GBP": 0.86},
            "GBP": {"USD": 1.27, "KES": 191.77, "EUR": 1.16},
        }
        
        rate = mock_rates.get(from_curr, {}).get(to_curr, 1.0)
        converted = amount * rate
        
        return {
            "success": True,
            "from_currency": from_curr,
            "to_currency": to_curr,
            "original_amount": amount,
            "converted_amount": round(converted, 2),
            "exchange_rate": rate,
            "note": "Using mock data - API key not configured"
        }
    
    try:
        # Query string for requests
        query_string = {"from": from_curr, "to": to_curr, "amount": amount}
        
        # Headers for requests 
        headers = {
            "x-rapidapi-key": currency_api,
            "x-rapidapi-host": currency_host
        }
        
        print(f"DEBUG: Making request to {currency_api_url}")
        print(f"DEBUG: Query params: {query_string}")
        
        # Make the request with timeout
        start_time = time.time()
        response = requests.get(
            currency_api_url, 
            headers=headers, 
            params=query_string,
            timeout=10
        )
        elapsed = time.time() - start_time
        
        print(f"DEBUG: Response time: {elapsed:.2f}s")
        print(f"DEBUG: Response status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"DEBUG: Response text: {response.text}")
            return {
                "error": f"API Error: {response.status_code}",
                "details": response.text[:200]
            }
        
        # Parse the response
        data = response.json()
        print(f"DEBUG: Response data: {data}")
        
        if "result" not in data:
            return {
                "error": "Invalid response from currency API",
                "data": data
            }
        
        # Calculate exchange rate
        exchange_rate = data.get("info", {}).get("rate")
        if not exchange_rate and amount > 0:
            exchange_rate = data["result"] / amount
        
        return {
            "success": True,
            "from_currency": from_curr,
            "to_currency": to_curr,
            "original_amount": amount,
            "converted_amount": round(data["result"], 2),
            "exchange_rate": round(exchange_rate, 4) if exchange_rate else None,
            "response_time": f"{elapsed:.2f}s"
        }
        
    except requests.exceptions.Timeout:
        print("DEBUG: Request timeout")
        return {"error": "Currency API timeout after 10 seconds"}
    except requests.exceptions.RequestException as e:
        print(f"DEBUG: Request exception: {e}")
        return {"error": f"Network error: {str(e)}"}
    except Exception as e:
        print(f"DEBUG: Unexpected error: {e}")
        return {"error": f"Conversion failed: {str(e)}"}