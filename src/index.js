import React from 'react';
import ReactDOM from 'react-dom';

// Import routing components
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import App from './components/pages/App';
import Consultants from './components/pages/Consultants';
import Clients from './components/pages/Clients';
import Contrats from './components/pages/Contrats';
import NoMatch from './components/pages/NoMatch';
import Staffing from './components/pages/Staffing';
import Factures from './components/pages/Factures';
import NavWereport from './components/layout/NavWereport';

import Me from './components/pages/Me';


import './index.css';

const routes = [
  {
    path: '/',
    exact: true,
    sidebar: () => <div>App</div>,
    main: () => <App />
  },
  {
    path: '/consultants',
    sidebar: () => <div>Consultants</div>,
    main: () => <Consultants />
  },
  {
    path: '/clients',
    sidebar: () => <div>Clients</div>,
    main: () => <Clients />
  },
  {
    path: '/me',
    sidebar: () => <div>Me</div>,
    main: () => <Me />
  },
  {
    path: '/contrats',
    sidebar: () => <div>Contrats</div>,
    main: () => <Contrats />
  },
  {
    path: '/staffing',
    sidebar: () => <div>Staffing</div>,
    main: () => <Staffing />
  },
  {
    path: '/factures',
    sidebar: () => <div>Factures</div>,
    main: () => <Factures />
  }
]


ReactDOM.render(
  <Router>
    <div>
      <NavWereport routes={routes} />
      <Switch>
        {routes.map((route, index) => (
          // Render more <Route>s with the same paths as
          // above, but different components this time.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
  , document.getElementById('root')
)