import React, { Component } from 'react';
import Identicon from 'identicon.js';
import photo from '../photo.jpeg'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top flex-md-nowrap p-0 shadow" style={{'background-color': '#000000'}}>
        <a
          className="navbar-brand col-sm-8 col-md-2 mr-0"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
        <img src={photo} width="400" height="80" className="d-inline-block align-top" alt="" />
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>
            { this.props.account
              ? <img
                className='ml-2'
                width='30'
                height='30'
                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
              />
              : <span></span>
            }
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;