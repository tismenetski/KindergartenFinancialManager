import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Alert from '../layout/Alert';
import PrivateRoute from '../routing/PrivateRoute';
import Dashboard from '../dashboard/Dashboard';

const Routes = () => {
  return (
    <section className="container">
      <Alert />{' '}
      {/*We place the Alert component here so that in case of an error it will render on the screen*/}
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </section>
  );
};

export default Routes;
