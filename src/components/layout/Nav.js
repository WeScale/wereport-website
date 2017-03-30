import React from "react";

import {
  Link
} from 'react-router-dom';

import ConnectStore from '../store/ConnectStore';

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
      connect: false,
    };
  }

  componentWillMount() {
    ConnectStore.on("connect", () => {
      this.setState({
        connect: true,
      })
    })
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  }

  render() {
    let menu = null
    let hiddenMenu = null
    if(ConnectStore.getProfil()!=='CONSULTANT'){
      hiddenMenu = <li><Link to="/staffing">Staffing</Link></li>
    }
    if (this.state.connect) {
      menu = <ul className="nav navbar-nav menu-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/me">{ConnectStore.getUsername()}</Link></li>
        <li><Link to="/clients">Clients</Link></li>
        <li><Link to="/consultants">Consultants</Link></li>
        <li><Link to="/contrats">Contrats</Link></li>
        {hiddenMenu}
      </ul>;
    } else {
      menu = <ul className="nav navbar-nav menu-links">
        <li><Link to="/">Home</Link></li>
        <li><a href="http://blog.wescale.fr/">Blog</a></li>
      </ul>;
    }

    return (
      <nav className="navbar navbar-default">
        <div className="menu-background"></div>
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/"><img src="http://www.wescale.fr/images/logo.png"
              alt="Wescale - Cloud Expert logo" width="148" height="58" /></Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            {menu}

            <ul className="nav navbar-nav navbar-right">
              {/*<li>
                {this.props.routes.map((route, index) => (
                  // You can render a <Route> in as many places
                  // as you want in your app. It will render along
                  // with any other <Route>s that also match the URL.
                  // So, a sidebar or breadcrumbs or anything else
                  // that requires you to render multiple things
                  // in multiple places at the same URL is nothing
                  // more than multiple <Route>s.
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.sidebar}
                  />
                ))}
              </li>*/}
              <li className="socials">
                <a href="https://twitter.com/yeswescale" title="Twitter"><i className="fa fa-twitter"
                  aria-hidden="true"></i></a>
                <a href="https://www.linkedin.com/company/wescale" title="Linkedin"><i className="fa fa-linkedin"
                  aria-hidden="true"></i></a>
                <a href="https://github.com/WeScale" title="Github"><i className="fa fa-github"></i></a>
                <a href="https://speakerdeck.com/wescale" title="Speaker Deck"><i className="fa fa-slideshare"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
