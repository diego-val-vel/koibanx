# KOIBANX API

This is my proposed solution to the exam for the vacancy as a software engineer.
This project is an API that currently contains two endpoints for:

1. GET - Consult all shops.

- http://localhost:3000/api/stores
- http://localhost:3000/api/stores?page=1&limit=20
- CURL
```bash
curl --location --request GET 'http://localhost:3000/api/stores?limit=20&page=1' \
--header 'Authorization: Basic dGVzdEBrb2liYW54LmNvbTphZG1pbg=='
```

2. POST - Add a new shop.

-  http://localhost:3000/api/store
- Body
{
    "name": "name_99",
    "cuit": "cuit_99",
    "concepts": ["test", 4, "1", 7, "3", 2, "insert a store"],
    "currentBalance": "7065.76",
    "lastSale": "2019-11-11"
}

- CURL
```bash
curl --location --request POST 'http://localhost:3000/api/store' \
--header 'Authorization: Basic dGVzdEBrb2liYW54LmNvbTphZG1pbg==' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "name_99",
    "cuit": "cuit_99",
    "concepts": ["test", 4, "1", 7, "3", 2, "insert a store"],
    "currentBalance": "7065.76",
    "lastSale": "2019-11-11"
}'
```

3. Both endpoints needs the header Authorization Basic.

- Username: test@koibanx.com
- Password: admin

## Installation

To use the API you use:

- nodeJS v17.8.0
- npm 8.5.5

```bash
npm i
npm start
npm test
```

## Notes

1. Files of type env are not added to gitignore for testing purposes.
2. In the challenge instructions is mentioned that for authentication the user test@koibanx.com has the password test123, however, in the delivered code the password with which the user was created is admin.
3. The currency that was handled is in MXN.
4. The seeder function is found within the unit tests (POST), the intention is that, every time the tests are executed, this function inserts information to the DB while validating its correct operation.
