# Simple e-commerce backend

This project is a simple e-commerce backend.

## Features

- Follows Controller - Service- Repository pattern
- Uses MongoDB as a database and native mongodb driver to communicate with the database.
- Built with Express.js framework.
- Implements a custom authentication system and encrypt user passwords with bcrypt.
- Handles file uploads with multer and upload files to AWS S3 Storage.
- Send mails with the nodemailer package.
- Implements Socket.io for users to observe product price changes realtime.

## Sending authenticated requests

Some endpoints are restricted to authenticated users only.
To send an authenticated request, add `X-Session-Token` header to request headers with a valid session token.

## Auth endpoint

### Login - GET - /api/auth/login

Example request body:

```
{
    email: 'example@example.com',
    password: 'some super secret password'
}
```

Example request endpoint

```
https://api.example.com/api/auth/login
```

Returns:

```
{
    _id: '5gT7yHnc31',
    name: 'John Doe',
    email: 'example@example.com',
    sessionToken: '964638c64d29743075d54aa21f389049d80a0a4acf49bb05a4f9'
}
```

### Register - POST - /api/auth/register

Example request body:

```
{
    name: 'John Doe',
    email: 'example@example.com',
    password: 'some super secret password'
}
```

Example request endpoint

```
https://api.example.com/api/auth/register
```

Returns:

```
{
    _id: '5gT7yHnc31',
    name: 'John Doe',
    email: 'example@example.com',
    sessionToken: '964638c64d29743075d54aa21f389049d80a0a4acf49bb05a4f9'
}
```

## Product

### Get product - GET - /api/product/{productId}

Example request endpoint

```
https://api.example.com/api/product/11t64vb0bq
```

Returns:

```
{
    "_id": "11t64vb0bq",
    "title": "Hiking backpack blue 125",
    "description": "Backpack for hiking",
    "category": "sports",
    "price": 52,
    "image": "https://cdn.example.com/1555063a-800x800.jpg",
    "user": {
        _id: '5gT7yHnc31',
        name: 'John Doe',
    }
}
```

### Post a new product - POST - /api/product/

This request requires authentication!
Example request body.

```
{
    "title": "Hiking backpack blue 125",
    "description": "Backpack for hiking",
    "category": "sports",
    "price": 52,
    "image": "https://cdn.example.com/1555063a-800x800.jpg"
}
```

Example request endpoint

```
https://api.example.com/api/product
```

Example request header:

```
X-Session-Token: '964638c64d29743075d54aa21f389049d80a0a4acf49bb05a4f9'
```

Returns:

```
{
    "_id": "11t64vb0bq",
    "title": "Hiking backpack blue 125",
    "description": "Backpack for hiking",
    "category": "sports",
    "price": 52,
    "image": "https://cdn.example.com/1555063a-800x800.jpg",
    "user": {
        _id: '5gT7yHnc31',
        name: 'John Doe',
    }
}
```

### Edit an existing product - PUT - /api/product/{productId}

This request requires authentication!
Example request endpoint

```
https://api.example.com/api/product/11t64vb0bq
```

Example request body.

```
{
    /**
    * you can add one of these fields: description, title, price, image, category
    * You have to add at least one field. Or operation will fail.
    */
    "title": "New title yay!",
}
```

Example request header:

```
X-Session-Token: '964638c64d29743075d54aa21f389049d80a0a4acf49bb05a4f9'
```

Returns:

```
{
    "_id": "11t64vb0bq",
    "title": "New title yay!",
    "description": "Backpack for hiking",
    "category": "sports",
    "price": 52,
    "image": "https://cdn.example.com/1555063a-800x800.jpg",
    "user": {
        _id: '5gT7yHnc31',
        name: 'John Doe',
    }
}
```

### Delete an existing product - DELETE - /api/product/{productId}

This request requires authentication!
Example request endpoint

```
https://api.example.com/api/product/11t64vb0bq
```

Example request header:

```
X-Session-Token: '964638c64d29743075d54aa21f389049d80a0a4acf49bb05a4f9'
```

Returns:

```
{
    result: "Item deleted"
}
```

## User

### Get user - GET - /api/user/{userId}

Example request endpoint

```
https://api.example.com/api/user/5gT7yHnc31
```

Returns:

```
{
    _id: '5gT7yHnc31',
    name: 'John Doe',
}
```

## CartItem

### Get items in the cart - GET - /api/cartitem/

This request requires authentication!
Example request endpoint

```
https://api.example.com/api/cartitem
```

Example request header:

```
X-Session-Token: '964638c64d29743075d54aa21f389049d80a0a4acf49bb05a4f9'
```

Returns:

```
[
    {
        "_id": "8xa3vtqjkvkup6bve8z7",
        "count": 2,
        "product": "kup6bve8z7",
        "user": "8xa3vtqjkv"
    },
    {
        "_id": "8xa3vtqjkv7lkhn5b123",
        "count": 6,
        "product": "7lkhn5b123",
        "user": "8xa3vtqjkv"
    },
    {
        "_id": "8xa3vtqjkv1234567890",
        "count": 25,
        "product": "1234567890",
        "user": "8xa3vtqjkv"
    }
]
```

## CartItem

### Add items in the cart - POST - /api/cartitem/

This request requires authentication!
Example request endpoint

```
https://api.example.com/api/cartitem
```

Example request body.

```
/** count field is optional and it defaults to 1 */
{
    product: "productId",
    count: 5,
}
```

Example request header:

```
X-Session-Token: '964638c64d29743075d54aa21f389049d80a0a4acf49bb05a4f9'
```

Returns:

```
{
    result: "items added to cart"
}
```

## Files

### Upload file - POST - /api/file/upload

Example request endpoint

```
https://api.example.com/api/file/upload
```

Returns:

```
{
    url: "https://cdn.example.com/1555063a-800x800.jpg"
}
```
