import React, {Component} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import {ConnectedRouter as Router} from 'react-router-redux';
import {connect} from 'react-redux';
import './App.css';
import {Login, Home} from './pages';
import {SideNav} from './components';
import * as Action from './actions';

const mapStateToProps = store => {
  return {user: store.user}
};
class App extends Component {
  constructor() {
    super();
    this.state = {
      links: [
        {
          to: '/',
          exact: true,
          icon: 'home',
          content: 'Home',
          component: Home
        }, {
          to: '/settings',
          icon: 'gear',
          content: 'Settings',
          component: null
        }
      ]
    };
  }
  isLoggedIn() {
    return Boolean(this.props.user.user);
  }
  login(username,password){
    this.props.dispatch(Action.User.login(username,password))
  }
  render() {
    let allowed = this.isLoggedIn();
    return (
      <Router history={this.props.history}>
        <div className="App">
          <Switch>
            <Route
              path="/login"
              render={(props) => (<Login
              {...props}
              badLogin={this.props.user.badCredentials}
              login={this.login.bind(this)}/>)}/>
            <PrivateRoute
              path="/"
              component={Navigaton}
              links={this.state.links}
              allowed={allowed}/>
            <Redirect to="/"/>
          </Switch>
        </div>
      </Router>
    );
  }
}

const Navigaton = props => {
  let routes = props
    .links
    .map(route =>< Route key = {
      route.to
    }
    path = {
      route.to
    }
    exact = {
      route.exact
    }
    component = {
      route.component
    } />)
  return (
    <span>
      <SideNav match={props.match} links={props.links}/> {routes}
    </span>
  )
}

export default connect(mapStateToProps)(App);
const PrivateRoute = ({
  component: Component,
  allowed,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
    return (allowed
      ? (<Component {...props} {...rest}/>)
      : (<Redirect
        to={{
        pathname: '/login',
        state: {
          from: props.location
        }
      }}/>))
  }}/>
)
