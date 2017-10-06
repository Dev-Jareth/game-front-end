import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import './App.css';
import {Login, Home} from './pages';
import Settings from './Settings';
import {SideNav} from './components';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      links:[{
        to: '/',
        exact:true,
        icon: 'home',
        content: 'Home',
        component: Home
      },{
        to: '/settings',
        icon: 'gear',
        content: 'Settings',
        component: Settings
      },
    ]
    };
  }
  login(user) {
    this.setState({user});
  }
  isLoggedIn() {
    return Boolean(this.state.user);
    // return true;
  }
  render() {
    let allowed = this.isLoggedIn();
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route
              path="/login"
              render={(props) => (<Login {...props} login={this
              .login
              .bind(this)}/>)}/>
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
    .map(route =><Route key={route.to} path={route.to} exact={route.exact} component={route.component} />)
  return (
    <span>
      <SideNav match={props.match} links={props.links}/> {routes}
    </span>
  )
}

export default App;
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
