import React, { Component } from 'react';

import HeaderMenuData from '../../data/HeaderMenuData.json';

class Sidebar extends Component {
  //set default values
  fontSize = 22;
  fontWeight = 300;
  activeMenu = "";

  constructor(props) {
    super(props);
    this.state = {
      activeSidebar: props.defaultSidebar || ''
    }
  }

  initRender() { //change default values to passed props
    if(this.props.fontSize !== undefined && this.props.fontSize !== this.fontSize) {
      this.fontSize = this.props.fontSize;
    }
    if(this.props.fontWeight !== undefined && this.props.fontWeight !== this.fontWeight) {
      this.fontWeight = this.props.fontWeight;
    }
    if(this.props.activeMenu !== undefined && this.props.activeMenu !== this.activeMenu) {
      this.activeMenu = this.props.activeMenu;
    }
  }

  handleSidebarClicked(id) {
    this.setState({activeSidebar: id});
    if (typeof this.props.onSidebarChanged === "function") {
      this.props.onSidebarChanged(id);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.activeMenu !== this.props.activeMenu ||
      nextState.activeSidebar !== this.state.activeSidebar
    )
  }

  render() {
    this.initRender();

    var renderSidebar = (activeMenu) => {
      return HeaderMenuData.map((data) => {
        if (data.id === activeMenu) {
          return renderSidebarItem(data.submenu);
        }
      })
    }

    var renderSidebarItem = (items) => {
      return items.map((item, index) => {
        var activeClass = (this.state.activeSidebar === item.id) ? "active" : "";
        return (
          <div key={index} className={`sidebar-menu ${activeClass}`} onClick={() => {this.handleSidebarClicked(item.id)}}>
            <p className="sidebar-item">{item.text}</p>
            <style jsx>
              {`
                .sidebar-menu {
                  font-size: ${this.fontSize}px;
                  font-weight: ${this.fontWeight};
                  color: #66757f;
                  cursor: pointer;
                  padding: 5px 25px;
                  box-sizing: border-box;
                }
                .sidebar-menu.active {
                  color: #5A90B6;
                  background-color: #fafbfd;
                  border-right: 3px solid #5A90B6;
                }
                .sidebar-menu:hover {
                  width: 100%;
                  color: #5A90B6;
                  background-color: #fafbfd;
                }
              `}
            </style>
          </div>
        )
      })
    }

    return (
      <div className="sidebar-container">
        <div className="sidebar-menu-container">
          {this.activeMenu && renderSidebar(this.activeMenu)}
        </div>
        <style jsx>
          {`
            .sidebar-container {
              background-color: white;
              float: left;
              width: 100%;
              height: -webkit-fill-available;
              border-right: 2px solid #eae9ea;
            }
            .sidebar-menu-container {
              margin-top: 20px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Sidebar;
