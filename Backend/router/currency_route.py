from fastapi import APIRouter, HTTPException
from utils.currency import currency_converter

router = APIRouter()

# Common currency codes for frontend dropdown
COMMON_CURRENCIES = [
    {"code": "USD", "name": "US Dollar", "symbol": "$"},
    {"code": "EUR", "name": "Euro", "symbol": "€"},
    {"code": "GBP", "name": "British Pound", "symbol": "£"},
    {"code": "KES", "name": "Kenyan Shilling", "symbol": "KSh"},
    {"code": "TZS", "name": "Tanzanian Shilling", "symbol": "TSh"},
    {"code": "UGX", "name": "Ugandan Shilling", "symbol": "USh"},
    {"code": "ZAR", "name": "South African Rand", "symbol": "R"},
    {"code": "INR", "name": "Indian Rupee", "symbol": "₹"},
    {"code": "CNY", "name": "Chinese Yuan", "symbol": "¥"},
    {"code": "JPY", "name": "Japanese Yen", "symbol": "¥"},
    {"code": "AUD", "name": "Australian Dollar", "symbol": "A$"},
    {"code": "CAD", "name": "Canadian Dollar", "symbol": "C$"},
]

@router.get("/currencies")
async def get_currencies():
    """Get list of supported currencies for dropdown"""
    return {"currencies": COMMON_CURRENCIES}

@router.get("/convert")
async def convert_currency(from_curr: str, to_curr: str, amount: float):
    """Convert currency amount"""
    result = currency_converter(from_curr, to_curr, amount)
    
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    
    return result

@router.get("/test")
async def test_conversion():
    """Test endpoint to verify currency converter works"""
    test_result = currency_converter("USD", "KES", 100)
    return {
        "test": "Currency converter test",
        "result": test_result,
        "endpoints": {
            "currencies": "/currency/currencies",
            "convert": "/currency/convert?from_curr=USD&to_curr=KES&amount=100"
        }
    }

@router.get("/convert/batch")
async def convert_batch(from_curr: str, to_curr: str, amounts: str):
    """Convert multiple amounts at once (for multiple prices on page)"""
    try:
        # amounts should be comma-separated string: "100,200,300"
        amount_list = [float(x.strip()) for x in amounts.split(",")]
        
        results = []
        for amount in amount_list:
            conversion = currency_converter(from_curr, to_curr, amount)
            if "error" in conversion:
                results.append({"amount": amount, "error": conversion["error"]})
            else:
                results.append({
                    "original_amount": amount,
                    "converted_amount": conversion["converted_amount"]
                })
        
        return {
            "from_currency": from_curr,
            "to_currency": to_curr,
            "conversions": results
        }
    
        
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid amounts format. Use comma-separated numbers.")