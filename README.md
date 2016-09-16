# simple-authorizenet
A lightweight and simplified 'authorizenet' with Promise support.

## Install
```
npm i --save simple-authorizenet
```

## Setup
Simple authorize.net credit card charge with Promise support.

Requires the following environment variables:

`AUTH_NET_API` - Your authorize.net API key.

`AUTH_NET_KEY` - Your authorize.net transactionKey.

`AUTH_NET_URL` - **https://apitest.authorize.net/xml/v1/request.api** or **https://api.authorize.net/xml/v1/request.api**

## Example
Charge a card.

```javascript
import authNet from 'simple-authorizenet';

const charge = {
  number: '4242424242424242',
  exp: '0822', // Format: mmyy
  code: '999',
  amount: 2.99,
  email: 'brewercalvinj@gmail.com',
  firstName: 'CJ',
  lastName: 'Brewer',
};

authNet(charge)
  .then(parsedResponse => {
    // Success
  })
  .catch(err => {
    // Error
  });
```
