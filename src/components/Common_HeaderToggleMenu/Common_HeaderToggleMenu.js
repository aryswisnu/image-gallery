import React, { Component } from 'react';

class HeaderToggleMenu extends Component {
  //set default values
  fontSize = 14;
  fontWeight = 500;
  data = [];

  constructor(props) {
    super(props);
    this.state = {
      activeToggle: props.defaultActiveMenu || ""
    }
  }

  initRender() { //change default values to passed props
    if(this.props.fontSize !== undefined && this.props.fontSize !== this.fontSize) {
      this.fontSize = this.props.fontSize;
    }
    if(this.props.fontWeight !== undefined && this.props.fontWeight !== this.fontWeight) {
      this.fontWeight = this.props.fontWeight;
    }
    if(this.props.data !== undefined && this.props.data !== this.data) {
      this.data = this.props.data;
    }
  }

  handleToggleMenuClicked(id) {
    this.setState({activeToggle: id});
    if (typeof this.props.onToggleClicked === "function") {
      this.props.onToggleClicked(id);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.activeToggle !== this.state.activeToggle
    )
  }

  render() {
    this.initRender();

    var renderToggleMenu = () => {
      return this.data.map((menu,index) => {
        var activeClass = (this.state.activeToggle === menu.id) ? "active" : "";
        return (
          <div key={index} className="header-toggle-menu">
            <span key={index} className={`header-toggle-item ${activeClass}`} onClick={() => this.handleToggleMenuClicked(menu.id)}>{menu.text}</span>
            <style jsx>
              {`
                .header-toggle-menu {
                  float: left;
                  width: calc(100%/${Object.keys(this.data).length});
                  text-align: center;
                }
                .header-toggle-item {
                  font-size: ${this.fontSize}px;
                  font-weight: ${this.fontWeight};
                  color: #66757f;
                  cursor: pointer;
                }
                .header-toggle-item.active {
                  padding-bottom: 24px;
                  color: #5A90B6;
                  border-bottom: 3px solid #5A90B6;
                }
                .header-toggle-item:hover {
                  padding-bottom: 24px;
                  color: #5A90B6;
                }
              `}
            </style>
          </div>
        )
      })
    }

    return (
      <div className="header-toggle-container">
        {this.data && this.data.length > 0 && renderToggleMenu()}
      </div>
    );
  }
}

export default HeaderToggleMenu;
