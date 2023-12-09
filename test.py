import requests
import hashlib
import hmac
import base64
from datetime import datetime

# Replace 'your_secret_key' with the actual secret key
secret_key = 'xxx..xxx'
access_key = 'xxx...xxx'
access_phrase = "xxx...xxx"

method = "GET"
now = datetime.utcnow()
iso_string = now.strftime('%Y-%m-%dT%H:%M:%SZ')
path = "/api/v5/explorer/brc20/address-balance-list?address=xxx"

message = iso_string + method + path
hash = hmac.new(secret_key.encode('utf-8'), message.encode('utf-8'), hashlib.sha256)
sign = base64.b64encode(hash.digest()).decode('utf-8')

# Make the GET request
url = 'https://www.okx.com' + path  # Replace with the actual base URL
headers = {
    'Content-Type': 'application/json',
    'OK-ACCESS-SIGN': sign,
    'OK-ACCESS-TIMESTAMP': iso_string,
    'OK-ACCESS-KEY': access_key,
    'OK-ACCESS-PASSPHRASE': access_phrase
}

response = requests.get(url, headers=headers)

try:
    data = response.json()
    print('Response:', data)
    # Handle the response data as needed
except ValueError as e:
    print('Error decoding JSON:', e)

if response.status_code != 200:
    print('Error:', response.status_code, response.text)
