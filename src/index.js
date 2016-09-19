import rp from 'request-promise';

/**
 * Simple authorize.net credit card charge with Promise support.
 *
 * Requires the following environment variables:
 * `AUTH_NET_API` - Your authorize.net API key.
 * `AUTH_NET_KEY` - Your authorize.net transactionKey.
 * `AUTH_NET_URL` - *https://apitest.authorize.net/xml/v1/request.api* or *https://api.authorize.net/xml/v1/request.api*
 *
 * Example
 * ```
 * import authNet from 'simple-authorizenet';
 *
 * const charge = {
 *   number: '4242424242424242',
 *   exp: '0822',
 *   code: '999',
 *   amount: 2.99,
 *   email: 'brewercalvinj@gmail.com',
 *   firstName: 'CJ',
 *   lastName: 'Brewer',
 * };
 *
 * authNet(charge)
 *   .then(parsedResponse => {
 *     // Success
 *   })
 *   .catch(err => {
 *     // Error
 *   });
 * ```
 *
 * @param  {String} number - Credit card number.
 * @param  {String} exp - Expiration month and year in the format of `mmyy`.
 * @param  {String} code - Credit card CVC code.
 * @param  {Number} amount - Amount to be charged in the format `2.99`
 * @param  {String} email - Email address of the purchaser.
 * @param  {String} firstName - First name of the purchaser.
 * @param  {String} lastName - Last name of the purchaser.
 * @return {Function} request-promise
 */
export default ({ number, exp, code, amount, email, firstName, lastName, description }) => {
  // Reference: https://developer.authorize.net/api/reference/index.html#payment-transactions
  const createRequest = {
    createTransactionRequest: {
      merchantAuthentication: {
        name: process.env.AUTH_NET_API,
        transactionKey: process.env.AUTH_NET_KEY,
      },
      clientId: null,
      transactionRequest: {
        transactionType: 'authCaptureTransaction',
        amount,
        payment: {
          creditCard: {
            cardNumber: number,
            expirationDate: exp,
            cardCode: code,
          },
        },
        customer: {
          email,
        },
        billTo: {
          firstName,
          lastName,
        },
        order: {
          description,
        },
      },
    },
  };

  // Request-promise options
  const options = {
    method: 'POST',
    uri: process.env.AUTH_NET_URL,
    body: createRequest,
    json: true,
  };

  // Authorize.net response has an artifact at the begging of the JSON string
  return rp(options)
    .then(response => JSON.parse(response.substring(1, response.length)))
    .catch((err) => {
      throw err;
    });
};
