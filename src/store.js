import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import rootReducer from "./reducers/index";

export const history = createBrowserHistory();

const store = configureStore({
  reducer: { router: connectRouter(history), rootReducer },
  middleware: [
    ...getDefaultMiddleware({ serializableCheck: false }),
    routerMiddleware(history),
  ],
});

export default store;
