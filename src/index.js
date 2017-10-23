import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";
const history = createHistory();
ReactDOM.render(
  <Provider store={store(history)}>
    <App history={history} />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
