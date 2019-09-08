
# Cart Micro Service


## Requirement

 1. Node.JS Version 10.3.0 onwards
 2. Postgres 9.6 onwards
  

## Setup

For database setup, you have two options..

- Through Docker (recommended)

- Install Docker and run the **docker-compose up** command in the terminal at the project root directory (which will target the `docker-compose.yml` file).

- Assuming you did not change anything in the `.env` file, the postgres created will be compatible with it or you can copy env file from env directory

- Manual setup

- Install and setup your own PostgresDB (9.6 or newer)

- Create the database, user, user-password as per the `.env` file in the project root directory and check that it is listening to the right port.


With the database setup out of the way, things are simpler now with the following steps.

`npm install`

- Run the seed command from `package.json` - **npm run seed** (this will create the tables and seed some sample data needed for the test)

- Finally run **npm run start** to run the service. If everything is setup and running properly, you can now curl (http://localhost:6482/) and get a `200 Ok response`.

## Local Database

`npm run cart:start:local`

## Heroku Database

`npm run cart:start:nightly`

## Documentation

Can use swagger (did not get time to do)

Exported the insomnia file.

[Insomnia File](https://github.com/manishkpr/cart-ms/blob/master/cart-service/docs/Insomnia_2019-08-20.json "Insomnia File")

## Load Test

Can use artillery to do the load test (did not get time to do)

## Database Design

https://dbdiagram.io/d/5d6bd4b9ced98361d6de1862

## API End Points

### Get Cart

 `curl --request GET \
  --url http://localhost:6482/v1.0/cart/daa76a35-af45-4ec9-a307-59282d9fdba8`
  
  Output:
  
  ```JSON
  {
  "data": {
    "cart_id": "daa76a35-af45-4ec9-a307-59282d9fdba8",
    "items": [
      {
        "product_id": "9144413e-5743-4afe-b366-7ff765abd096",
        "name": "iPhone X",
        "qty": 1,
        "price": 950
      },
      {
        "product_id": "56b6e5e8-7d7c-45e3-80b5-20d66a31da46",
        "name": "iPhone 8",
        "qty": 2,
        "price": 750
      }
    ],
    "sub_total": 2450,
    "tax": 7,
    "discount": 1.5,
    "total": "2594.65"
  },
  "meta": {
    "requestId": "27435883-51d8-43ae-aa2b-05656be398f6",
    "timestamp": 1567788311738
  }
}
  ```
  

### Service Heath Check

`curl --request GET \
  --url http://localhost:6482/`
  
 Output:
 ```JSON
 {
  "data": "Ok!",
  "meta": {
    "requestId": "fe77f9e0-b304-47ef-b17f-f68da154b19f",
    "timestamp": 1567788561833
  }
}
 ```

### Get Service Config

`curl --request GET \
  --url http://localhost:6482/configs \
  --header 'x-auth-admin: w4VoTrll744I7WermiGaeCyJt3IH8DpB'`
  
  Output:
  ```JSON
  {
  "data": {
    "configs": {
      "App": {
        "APP_VERSION_1.0": "v1.0",
        "APP_ENV": "local",
        "APP_PORT": "6482",
        "ADMIN_API_KEY": "XXXXXDpB",
        "LOG_DIR": "logs-cart"
      },
      "DB": {
        "PG": {
          "HOST": "192.168.99.100",
          "PORT": "5432",
          "USER": "cart",
          "PASS": "XXXXX23!",
          "DB": "db_cart",
          "MIN": 1,
          "MAX": 2,
          "IDLE_TIMEOUT_MS": "1000"
        }
      }
    }
  },
  "meta": {
    "requestId": "458f97ab-2ab3-417d-9f75-5db801339484",
    "timestamp": 1567788652810
  }
}
  ```
