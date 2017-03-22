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
import NoMatch from './components/pages/NoMatch';
import Nav from './components/layout/Nav';


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
  }
]

/*
ReactDOM.render(
   <Router history={hashHistory}>
        <Route path="/" exact component={Layout}>
            <IndexRoute name="app" component={App} />
            <Route path="connect" name="connect" component={Connect}/>
            <Route path="consultants(/:consultantid)" name="consultants" component={Consultants}></Route>
            <Route path="clients(/:clientid)" name="clients" component={Clients}></Route>
        </Route>
    </Router>,
  document.getElementById('root')
);*/

ReactDOM.render(
  <Router>
    <div>
      
      <Nav routes={routes} />

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