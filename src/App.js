import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "react-router-redux";
import { connect } from "react-redux";
import "./App.css";
import { Login, Home } from "./pages";
import * as Action from "./actions";

const mapStateToProps = store => {
  return { user: store.user };
};
export class App extends Component {
  constructor() {
    super();
    this.state = {
      links: [
        {
          to: "/",
          exact: true,
          component: Home
        },
        {
          to: "/settings",
          component: null
        }
      ]
    };
  }
  isLoggedIn = () => Boolean(this.props.user.user);
  login = (username, password) => this.props.dispatch(Action.User.login(username, password));
  render = () => {
    let allowed = this.isLoggedIn();
    return (
      <div className="App">
        <Router history={this.props.history}>
          <Switch>
            <Route
              path="/login"
              render={props => (
                <Login
                  {...props}
                  badLogin={this.props.user.badCredentials}
                  goodLogin={this.props.user.goodCredentials}
                  pendingResponse={this.props.user.pending}
                  dispatch={this.props.dispatch}
                  login={this.login.bind(this)}
                />
              )}
            />
            <PrivateRoute path="/" component={Navigaton} links={this.state.links} allowed={allowed} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    );
  };
}

const Navigaton = props =>
  props.links.map(route => <Route key={route.to} path={route.to} exact={route.exact} component={route.component} />);

export default connect(mapStateToProps)(App);
const PrivateRoute = ({ component: Component, allowed, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      allowed ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )}
  />
);
