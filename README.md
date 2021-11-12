---
title: Plaid endpoint
keywords: 
last_updated: February 20, 2020
tags: []
summary: "Detailed description of the API of the Plaid endpoint."
sidebar: extensions_sidebar
permalink: endpoints_plaid.html
folder: extensions
---

## Overview

The Plaid endpoint supports instant verification for many of the most popular banks.
Plaid provides the quickest way to collect and verify customer’s banking information. Using the Stripe + Plaid integration, you’re able to instantly receive a verified bank account, allowing for immediate charging.
​
Some of the features are:

- Generate access tokens.
- Listing all suported institutions, or search one by ID.
- Retrieving and removing Items.
- Retrieving Auth, Transactions and Balance products.
​
## Glossary

- Item: a set of credentials at a financial institution; each Item can have many Accounts, and some Accounts have Transactions associated with them.
- client_id and secret: two private API keys; used in conjunction with an access_token to access data for an Item. You wont need to handle these keys, the endpoint does that for you.
- public_key: a public API identifier; used to initialize Link and identify Items you create or update via Link. You wont need to handle this key, the endpoint does that for you.
- access_token: a rotatable token unique to a single Item; used to access data for that Item.
- public_token: a short-lived token that can be exchanged for an access_token or used to initialize Link in update mode for an Item.

## Configuration
​
You will need to create a user in Plaid that will be used to access the API. Once you’ve completed the signup process you’ll be provided a live client_id, secret, and public_key via the Dashboard.

### Client ID, Secret and Public Key
​
These credentials are provided by Plaid once you've created an account. You can see it in your account's dashboard.
​
### Environment

The Plaid environment to which the endpoint will point to. Possible values are Sandbox, Development and Production.​

### Products

Specify the Plaid products your endpoint will be using.

## Quick start
​
For most of the endpoint features you will need to have an access_token. To get an access_token you first need to exchange it for a public_token. In order to exchange a public_token for an access_token, you first need to setup the Plaid UI plugin. You can see the docs of the plugin [here](https://slingr-stack.github.io/platform/ui_plugins_plaid.html).
Once a user has entered his credentials, you'll receive a public_token in the callbackData parameter of the onSuccess callback. Then, you will be able to exchange that public_token for an access_token. It should look something like this:

```js
sys.ui.sendMessage({
    scope: 'plugin:plaid',
    name: 'open',
    data: {
       clientName: 'MyClientName',
       key: '7cbc43c1e4b257e34a6cwefwqlf3039f',
       product: ['transactions','auth'],
       env: 'sandbox'
    },
    callbacks: {
      onSuccess: function(originalMessage, callbackData) {
        sys.logs.info('Here is the callback data, which contains the public_token you need');
        sys.logs.info(JSON.stringify(callbackData));
        sys.logs.info('This is where we exchange the public_token for the access_token');
        var res = app.endpoints.proxy.getAccessToken(callbackData.publicToken);
        sys.logs.info('This is the access_token contained in the response');
        sys.logs.info(res.access_token);
      },
      onExit: function(originalMessage, callbackData) {
        // some code
      },
      onEvent: function(originalMessage, callbackData) {
        // some code
      }
    }
});
```
Remember to store this access_token, as you will need it later.​

## Javascript API

### Get an Institution by ID:

Returns a JSON response containing details on a specified financial institution currently supported by Plaid.

```js
var res = app.endpoints.proxy.getInstitutionById(institutionId);
sys.logs.info(JSON.stringify(res));
```

### List all Institutions:

Returns a JSON response containing details on all financial institutions currently supported by Plaid. Because Plaid support thousands of institutions, results are paginated.
​

```js
var res = app.endpoints.proxy.getInstitutions(count, offset, options);
sys.logs.info(JSON.stringify(res));
```

- count: The number of institutions to fetch, where 0 < count <= 500.
- offset: The number of institutions to skip, where offset >= 0.
The options parameter is an object that, if provided, must be non-null.
The following options are available:
- products: Filter the Institutions based on whether they support all products listed in products.
- include_optional_metadata: When true, return the institution's homepage URL, logo and primary brand color.
- country_codes: Specify an array of Plaid-supported country codes using the ISO-3166-1 alpha-2 country code standard.
- routing_numbers: Specify an array of routing numbers to filter institutions.​

### Get an access_token:

```js
var res = app.endpoints.proxy.getAccessToken(publicToken);
sys.logs.info('This is the access_token contained in the response');
sys.logs.info(res.access_token);
```

For the next couple of methods, you need to pass the access_token you get from the response of this request. For better reference, check the quick start example.

### Get an Item:

Returns information about the status of an Item.

```js
var res = app.endpoints.proxy.getItem(accessToken);
sys.logs.info(JSON.stringify(res));
```

### Remove an Item:

Allows you to remove an Item. Once removed, the access_token associated with the Item is no longer valid and cannot be used to access any data that was associated with the Item.

```js
var res = app.endpoints.proxy.removeItem(accessToken);
sys.logs.info(JSON.stringify(res));
```

### ​Get Auth:

Allows you to retrieve the bank account and routing numbers associated with an Item's checking and savings accounts, along with high-level account data and balances when available.

```js
var res = app.endpoints.proxy.getAuth(accessToken, options);
sys.logs.info(JSON.stringify(res));
```

The options parameter is an object that, if provided, must be non-null.
The following options are available:
- account_ids: A list of account_ids to retrieve for the Item.

### ​Get Accounts:

Retrieves all accounts related to an Item.

```js
var res = app.endpoints.proxy.getAccounts(accessToken);
sys.logs.info(JSON.stringify(res));
```

### Get Transactions:

Retrieves transactions from a determined time period.

```js
var res = app.endpoints.proxy.getTransactions(accessToken, startDate, endDate, options);
sys.logs.info(JSON.stringify(res));
```

The start and end date parameters should be formatted as YYYY-MM-DD.
The options parameter is an object that, if provided, must be non-null.
The following options are available:
- account_ids: A list of account_ids to retrieve for the Item.
- count: The number of transactions to fetch, where 0 < count <= 500.
- offset: The number of transactions to skip, where offset >= 0.​

### Get Account Balance:

Returns the real-time balance for each of an Item's accounts.

```js
var res = app.endpoints.proxy.getAccountBalance(accessToken, options);
sys.logs.info(JSON.stringify(res));
```

The options parameter is an object that, if provided, must be non-null.
The following options are available:
- account_ids: A list of account_ids to retrieve for the Item.

## About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

## License

This endpoint is licensed under the Apache License 2.0. See the `LICENSE` file for more details.

