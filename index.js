const fetch = (...args) =>
import('node-fetch').then(({ default: fetch }) => fetch(...args)); // Import the fetch library for making HTTP requests
var CryptoJS = require('crypto-js');

const method = "GET";
const now = new Date();
const isoString = now.toISOString();
const path = "/api/v5/explorer/brc20/address-balance-list?address=xxxxxx";

// Replace 'your_secret_key' with the actual secret key
const secretKey = 'xxx...xx';
const accessKey = 'xxx...xx';
const accessPhrase = "xxx...xx";
const message = isoString + method + path;
const hash = CryptoJS.HmacSHA256(message, secretKey);
const sign = CryptoJS.enc.Base64.stringify(hash);

// Make the GET request
const url = 'https://www.okx.com' + path; // Replace with the actual base URL
fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'OK-ACCESS-SIGN': sign,
        'OK-ACCESS-TIMESTAMP': isoString,
        'OK-ACCESS-KEY':accessKey,
        'OK-ACCESS-PASSPHRASE':accessPhrase
    },
})
    .then(response => response.json())
    .then(data => {
        console.log('Response:', data);
        // Handle the response data as needed
    })
    .catch(error => {
        console.error('Error:', error);
    });
