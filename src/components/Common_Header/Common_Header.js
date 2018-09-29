import React, { Component } from 'react';
import HeaderToggleMenu from '../Common_HeaderToggleMenu/Common_HeaderToggleMenu.js';

import HeaderMenuData from '../../data/HeaderMenuData.json';

class Header extends Component {
  //set default values
  defaultMenu = "";

  constructor(props) {
    super(props);
    this.handleHeaderClicked = this.handleHeaderClicked.bind(this);
  }

  initRender() { //change default values to passed props
    if(this.props.defaultMenu !== undefined && this.props.defaultMenu !== this.defaultMenu) {
      this.defaultMenu = this.props.defaultMenu;
    }
  }

  handleHeaderClicked(activeToggle) {
    if (typeof this.props.onHeaderChanged === "function") {
      this.props.onHeaderChanged(activeToggle);
    }
  }

  render() {
    this.initRender();

    return (
      <header className="header-container">
        <div className="header-side left">
          <a href="/">
            <img src="http://aryswisnu.com/oy-images/oy-logo.png" className="header-logo" alt=""/>
          </a>
          <div className="header-company-name">TokangKonci</div>
        </div>
        <div className="header-side center">
          <HeaderToggleMenu
            data={HeaderMenuData}
            fontWeight={700}
            defaultActiveMenu={this.defaultMenu}
            onToggleClicked={this.handleHeaderClicked}
          />
        </div>
        <div className="header-side right"></div>
        <style jsx>
          {`
            .header-container {
              float: left;
              width: 100%;
              height: 70px;
              background-color: white;
              border-bottom: 2px solid #eae9ea;
            }
            .header-logo {
              float: left;
              width: 50px;
              margin: 10px 15px 10px 20px;
            }
            .header-company-name {
              line-height: 70px;
              font-weight: 600;
              color: #3a759d;
            }
            .header-side {
              float: left;
            }
            .header-side.left {
              width: 20%;
            }
            .header-side.center {
              width: 60%;
              line-height: 70px;
            }
            .header-side.right {
              width: 20%;
            }
          `}
        </style>
      </header>
    );
  }
}

export default Header;
