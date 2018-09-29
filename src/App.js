import React, { Component } from 'react';
import Header from './components/Common_Header/Common_Header.js';
import UserInfomation from './components/User_Information/User_Information.js';

const DEFAULT_HEADER_MENU = 'informasi';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeHeader: DEFAULT_HEADER_MENU
    }
    this.handleHeaderChanged = this.handleHeaderChanged.bind(this);
  }

  handleHeaderChanged(activeHeader) {
    this.setState({activeHeader: activeHeader});
  }

  render() {

    return (
      <div className="App">
        <div className="header">
          <Header
            defaultMenu={DEFAULT_HEADER_MENU}
            onHeaderChanged={this.handleHeaderChanged}
          />
        </div>
        {this.state.activeHeader === 'informasi' &&
          <div className="user-information">
            <UserInfomation
              activeHeader={this.state.activeHeader}
            />
          </div>
        }
        <style jsx global>
          {`
            @import url(https://fonts.googleapis.com/css?family=Raleway);
            body {
              margin: 0;
              padding: 0;
              font-family: "Raleway", Helvetica, Arial, sans-serif;
              background-color: #fafbfd;
            }
          `}
        </style>
        <style jsx>
          {`
            .App {
              background-color: #fafbfd;
            }
            .header {
              position: fixed;
              width: 100%;
              z-index: 2;
            }
            .user-information {
              float: left;
              width: 100%;
              margin-top: 72px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default App;
