#using testClient for testing purposes
from fastapi.testclient import TestClient
from main import app
#using the random library for random selections
import random
#wrapping our app into testclient
client = TestClient(app)
#list of currencies a user can use
CURRENCIES = [
    "USD",  # United States Dollar
    "CAD",  # Canadian Dollar
    "KES",  # Kenyan Shilling
    "UGX",  # Ugandan Shilling
    "TZS",  # Tanzanian Shilling
    "ZAR",  # South African Rand
]
#our main currency test function
def test_currency_converter():
    from_curr = random.choice(CURRENCIES)
    #randomly choosing a different currency in our list as long as it is not from_curr
    to_curr = random.choice([curr for curr in CURRENCIES if curr != from_curr])
    #random number selection from 1-100
    amount = round(random.uniform(1, 100), 2)
    response = client.get(
        "/converter",params={"from_curr": from_curr,"to_curr": to_curr,"amount": amount}
    )
    #our response in json
    data = response.json()
    #this is us assuming or expecting our status to be 200
    assert response.status_code == 200
    #expecting or assuming converted_amount key is in data dict
    assert "converted_amount" in data
    #assuming or expecting that key to be a number or decimal
    assert isinstance(data["converted_amount"], (int, float))
    #prining results
    print(f"Tested {from_curr} -> {to_curr} | amount={amount}")
    print("Result:", data) # printing data result 
    print("STATUS:", response.status_code)
    print("BODY:", response.text)
if __name__ == "__main__":
    for _ in range(5):
        test_currency_converter()