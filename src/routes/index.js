import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import PropTypes from 'prop-types';

import Default from '../layouts/default';

import Login from '../screens/Login';
import Home from '../screens/Home';
import Form from '../screens/Form';
import AdditionalData from '../screens/AdditionalData';
import RegisterUser from '../screens/RegisterUser';

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest}>
    <Default>
      <Component />
    </Default>
  </Route>
);

PrivateRoute.propTypes = {
  component: PropTypes.func,
};

PrivateRoute.defaultProps = {
  component: () => <></>,
};

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/form" component={Form} />
        <PrivateRoute path="/:category" />
        <PrivateRoute path="/complemento-de-dados" component={AdditionalData} />
        <PrivateRoute path="/register" component={RegisterUser} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
