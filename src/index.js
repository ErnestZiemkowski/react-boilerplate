import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { ApolloProvider } from "@apollo/react-hooks";
import { Provider } from "react-redux";
import apolloClient from "./apolloClient";
import store from "./store";
import reportWebVitals from "./reportWebVitals";
import "./i18n";
import "styles/_general.scss";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

if (window.Cypress) {
  window.store = store;
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
