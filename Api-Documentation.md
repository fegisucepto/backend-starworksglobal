## Endpoints

List of Available Endpoints:

- `POST /register`
- `POST /login`
- `GET /wallet`
- `POST /wallet/topup/:id`
- `POST /wallet/pay/:id`
- `GET /wallet/:id`

### GET /register

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
  - Body
  ```json
  {
      "firstName": STRING,
      "lastName":  STRING,
      "dateOfBirth": DATE,
      "streetAddress":  STRING,
      "city":  STRING,
      "province":  STRING,
      "telephone": INTEGER,
      "email":  STRING,
      "username":  STRING,
      "password": STRING
  }
  ```

#### Response

_201 - Register_

- Body

  ```json

   {
    "statusCode": 200,
    "data": {
        "id": INTEGER,
        "username": STRING,
        "email": STRING,
        "walletAddress": STRING
    }
  }
  ```

### GET /login

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "username":STRING,
    "password": STRING
  }
  ```

#### Response

_201 - Ok_

- Body

  ```json
  {
    "statusCode": 200,
    "data": {
      "username": STRING,
      "access_token": STRING
    }
  }
  ```

### GET /wallet

#### Description

- Get all the wallet data

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "data": [
      {
        "id": INTEGER,
        "walletAddress": STRING,
        "balance": INTEGER,
        "createdAt": DATE,
        "updatedAt": DATE,
        "UserId": INTEGER
      }
    ]
  }
  ```

### POST /wallet/topup/:id

#### Description

- TopUp wallet data

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "amount": INTEGER
  }
  ```

#### Response

_201 - Success_

- Body
  ```json
  {
    "statusCode": 201,
    "message": "This Successfully TopUp",
    "data": {
      "balance": INTEGER
    }
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "error": {
      "message": String
    }
  }
  ```

### POST /wallet/pay/:id

#### Description

- Pay with wallet by Id

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "amount": INTEGER
  }
  ```

#### Response

_201 - Ok_

- Body
  ```json
  {
    "statusCode": 201,
    "message": "This Successfully pay",
    "data": {
      "balance": INTEGER
    }
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "error": {
      "message": String
    }
  }
  ```

### GET /wallet/:id

#### Description

- Show wallet by Id

#### Request

- Params

```json
{
    id : INTEGER
}
```

#### Respon

_201 - Ok_

- Body
  ```json
  {
    "statusCode": 200,
    "message": "This Wallet Has been Show",
    "data": INTEGER
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "error": {
      "message": String
    }
  }
  ```
