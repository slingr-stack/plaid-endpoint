package io.slingr.endpoints.plaid;

import io.slingr.endpoints.HttpEndpoint;
import io.slingr.endpoints.exceptions.EndpointException;
import io.slingr.endpoints.framework.annotations.EndpointConfiguration;
import io.slingr.endpoints.framework.annotations.EndpointFunction;
import io.slingr.endpoints.framework.annotations.EndpointProperty;
import io.slingr.endpoints.framework.annotations.SlingrEndpoint;
import io.slingr.endpoints.utils.Json;
import io.slingr.endpoints.ws.exchange.FunctionRequest;
import org.apache.log4j.Logger;

/**
 * <p>Plaid endpoint
 * <p>
 * <p>Created by fmartinez on 31/01/2020.
 */
@SlingrEndpoint(name = "plaid", functionPrefix = "_")
public class PlaidEndpoint extends HttpEndpoint {

    private final String API_URL = "https://sandbox.plaid.com";

    private static final Logger logger = Logger.getLogger(PlaidEndpoint.class);

    @EndpointConfiguration
    private Json config;

    @EndpointProperty(name = "client_id")
    private String clientId;

    @EndpointProperty(name = "secret")
    private String secret;

    @EndpointProperty(name = "public_key")
    private String publicKey;

    @Override
    public String getApiUri() {
        return API_URL;
    }

    @EndpointFunction(name = "_get")
    public Json get(FunctionRequest request) {
        logger.debug(String.format("GET [%s]", request.getJsonParams().string("path")));
        setRequestConfig(request);
        try {
            return defaultGetRequest(request);
        } catch (EndpointException e) {
            throw e;
        }
    }

    @EndpointFunction(name = "_put")
    public Json put(FunctionRequest request) {
        logger.debug(String.format("PUT [%s]", request.getJsonParams().string("path")));
        setRequestConfig(request);
        try {
            return defaultPutRequest(request);
        } catch (EndpointException e) {
            throw e;
        }
    }

    @EndpointFunction(name = "_patch")
    public Json patch(FunctionRequest request) {
        logger.debug(String.format("PATCH [%s]", request.getJsonParams().string("path")));
        setRequestConfig(request);
        try {
            return defaultPatchRequest(request);
        } catch (EndpointException e) {
            throw e;
        }
    }

    @EndpointFunction(name = "_post")
    public Json post(FunctionRequest request) {
        logger.debug(String.format("POST [%s]", request.getJsonParams().string("path")));
        setRequestConfig(request);
        try {
            return defaultPostRequest(request);
        } catch (EndpointException e) {
            throw e;
        }
    }

    @EndpointFunction(name = "_delete")
    public Json delete(FunctionRequest request) {
        logger.info(String.format("DELETE [%s]", request.getJsonParams().string("path")));
        setRequestConfig(request);
        try {
            return defaultDeleteRequest(request);
        } catch (EndpointException e) {
            throw e;
        }
    }

    private void setRequestConfig(FunctionRequest request) {
        Json requestData = request.getJsonParams();
        Json headers = requestData.json("headers");
        if (headers == null) {
            headers = Json.map();
        }
        requestData.set("headers", headers);
        Json body = requestData.json("body");
        if (body == null) {
            body = Json.map();
        }
        System.out.println(body);
        System.out.println(body.contains("count"));
        System.out.println(clientId);
        if (body.contains("client_id")) {
            body.set("client_id", clientId);
        }
        if (body.contains("secret")) {
            body.set("secret", secret);
        }
        if (body.contains("public_key")) {
            body.set("public_key", publicKey);
        }
        requestData.set("body", body);
    }

}
