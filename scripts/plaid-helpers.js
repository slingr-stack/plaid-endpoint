/////////////////////
// Public API - Generic Functions
/////////////////////

endpoint.get = function (url) {
    var options = checkHttpOptions(url, {});
    return endpoint._get(options);
};

endpoint.post = function (url, options, callbackData, callbacks) {
    options = checkHttpOptions(url, options);
    return endpoint._post(options, callbackData, callbacks);
};

endpoint.patch = function (url, options) {
    options = checkHttpOptions(url, options);
    return endpoint._patch(options);
};

endpoint.put = function (url, options) {
    options = checkHttpOptions(url, options);
    return endpoint._put(options);
};

endpoint.delete = function (url) {
    var options = checkHttpOptions(url, {});
    return endpoint._delete(options);
};

endpoint.getInstitutions = function() {
	return endpoint.post('/institutions/get', {body: {"client_id": true,
	                                                  "secret": true,
	                                                  "count": 100,
	                                                  "offset": 0,
	                                                  }});
};

endpoint.getInstitutionById = function(institutionId, options) {
    var body = {"institution_id": institutionId, "public_key": true};
    if (options) body.options = options;
    return endpoint.post('/institutions/get_by_id', {body: body});
};

endpoint.getAccessToken = function(publicToken) {
    return endpoint.post('/item/public_token/exchange',{body: {"public_token": publicToken,
                                                               "client_id": true,
                                                               "secret": true
                                                               }});
};

endpoint.getItem = function(accessToken) {
    return endpoint.post('/item/get',{body: {"access_token": accessToken,
                                             "client_id": true,
                                             "secret": true
                                             }});
};

endpoint.removeItem = function(accessToken) {
    return endpoint.post('/item/remove',{body: {"access_token": accessToken,
                                                "client_id": true,
                                                "secret": true
                                                }});
};

endpoint.getAuth = function(accessToken, options) {
    var body = {"client_id": true, "secret": true, "access_token": accessToken};
	if (options) body.options = options;
	return endpoint.post('/auth/get', {body: body});
};

endpoint.getAccounts = function(accessToken) {
    return endpoint.post('/accounts/get',{body: {"access_token": accessToken,
                                                 "client_id": true,
                                                 "secret": true
                                                 }});
};

endpoint.getTransactions = function(accessToken, startDate, endDate, options) {
    var body = {"client_id": true, "secret": true, "access_token": accessToken, "start_date": startDate, "end_date": endDate};
    if (options) body.options = options;
	return endpoint.post('/transactions/get', {body: body});
};

endpoint.getAccountBalance = function(accessToken, options) {
    var body = {"client_id": true, "secret": true, "access_token": accessToken};
    if (options) body.options = options;
	return endpoint.post('/accounts/balance/get', {body: body});
};

/////////////////////////////
//  Private helpers
/////////////////////////////

var checkHttpOptions = function (url, options) {
    options = options || {};
    if (!!url) {
        if (isObject(url)) {
            // take the 'url' parameter as the options
            options = url || {};
        } else {
            if (!!options.path || !!options.params || !!options.body) {
                // options contains the http package format
                options.path = url;
            } else {
                // create html package
                options = {
                    path: url,
                    body: options
                }
            }
        }
    }
    return options;
};

var isObject = function (obj) {
    return !!obj && stringType(obj) === '[object Object]'
};

var stringType = Function.prototype.call.bind(Object.prototype.toString);