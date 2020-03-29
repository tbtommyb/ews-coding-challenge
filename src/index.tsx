import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { createEpicMiddleware } from 'redux-observable';

import "./index.css";
import App from "./components/App";
import rootReducer from "./store/reducers";
import rootEpic from "./store/epics";
import { ActionTypes } from "./store/types";

import * as serviceWorker from "./serviceWorker";

const epicMiddleware = createEpicMiddleware<ActionTypes>();

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, {}, composeEnhancers(
  applyMiddleware(epicMiddleware)
));

epicMiddleware.run(rootEpic);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
