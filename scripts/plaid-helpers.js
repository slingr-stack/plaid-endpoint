endpoint.getInstitutions = function() {
//	return endpoint.post('/institutions/get',{body: {"client_id": 1000,
//	                                                 "secret": 1000,
//	                                                 "count": 110,
//	                                                 "offset": 1,
//	                                                 }});

sys.logs.info("here....");
};

endpoint.getPublicToken = function(institutionId) {
    return endpoint.post('/public_token/create',{body: {"public_key": true,
                                                        "initial_products": ["auth","transactions"],
                                                        "institution_id": institutionId
                                                       }});
};

endpoint.getAuth = function() {
	return endpoint.post('/auth/get');
};

endpoint.getTransactions = function() {
	return endpoint.post('/transactions/get');
};

endpoint.getAccountBalance = function() {
	return endpoint.post(url: '/accounts/balance/get');
};

