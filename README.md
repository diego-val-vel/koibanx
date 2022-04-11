# KOIBANX API

Koibanx is an API that currently contains two endpoints for:

1. Consult all shops.
2. Add a new shop.

This is my proposed solution to the exam for the vacancy as a software engineer.

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
