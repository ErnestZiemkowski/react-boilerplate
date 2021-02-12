import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
// import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { history } from "store";
import { customFetch } from "utils/appUtils";
import { ACCESS_TOKEN } from "consts";
import ROUTE from "routes";

const cache = new InMemoryCache({ addTypename: false });

// const wsLink = new WebSocketLink({
//   uri: `${process.env.REACT_APP_BASE_URL_WS}graphql`,
//   credentials: "omit",
// });

const fileUploadLink = createUploadLink({
  uri: `${process.env.REACT_APP_BASE_URL_HTTP}graphql`,
  credentials: "omit",
  fetch: customFetch,
});

const responseInterceptor = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const err = response && response.errors && response.errors[0];
    if (err && err.extensions && err.extensions.code === "401") {
      localStorage.removeItem(ACCESS_TOKEN);
      history.push(ROUTE.LOGIN.HOME);
    }

    return response;
  });
});

const requestInterceptor = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_BASE_URL_HTTP}graphql`,
  credentials: "omit",
});

const link = requestInterceptor
  .concat(responseInterceptor)
  .concat(httpLink)
  // .concat(wsLink)
  .concat(fileUploadLink);

const apolloClient = new ApolloClient({
  link,
  cache,
});

export default apolloClient;
