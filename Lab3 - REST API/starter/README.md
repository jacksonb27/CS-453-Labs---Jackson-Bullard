# Lab 3 REST API

## How to Run

```bash
npm install
npm run server
```

The server runs on:

```text
http://localhost:3000
```

## How to Test

```bash
npm test
```

## API Routes

| Method | Route | Description |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/items` | Return all items |
| GET | `/items/:id` | Return one item |
| POST | `/items` | Create one item |
| PUT | `/items/:id` | Update one item |
| DELETE | `/items/:id` | Delete one item |

## Reflection Answers

### 1. What makes this API more REST-like than the previous HTTP/JSON lab?

    # This API communicates back and forth from client to server using URLs and HTTP interactions and has more capabilities.


### 2. What is the purpose of a route parameter such as `/items/:id`?

    # Those parameters are useful so that the client can target a specific resource.


### 3. Why should `POST`, `PUT`, and `DELETE` use different HTTP methods?

    # Those 3 actions have different uses and return different results, therefore it makes it sense to break the HTTP up.


### 4. What is the difference between a `400` error and a `404` error?

    # A 400 error is thrown when the data is bad or corrupted, and a 404 error is thrown when a specific resource isn't found.


### 5. How does the OpenAPI file relate to your Express server code?

    # The OpenAPI file describes what is happening and breaks it down step by step.


## Graduate Extension

TODO: Graduate students should describe their extension here.