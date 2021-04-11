import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from '../_helpers/history.js';
import { Layout } from './Layout/Layout.js';
import { routes } from '../config/routes';

function App() {
  return (
    <div className='App'>
      <Router history={history}>
        <Layout>
          <Switch>
            {routes.map((route, i) => {
              return (
                route.component && (
                  <Route
                    key={i}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => <route.component {...props} />}
                  />
                )
              );
            })}
            <Redirect from='*' to='/' />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
