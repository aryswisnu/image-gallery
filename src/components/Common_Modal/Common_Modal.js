import React, { Component } from 'react';
import Form from '../Common_Form/Common_Form.js';

class Modal extends Component {
  //set default values
  data = {}
  headerText = ""

  constructor() {
    super();

    this.handleOnSaveButtonClicked = this.handleOnSaveButtonClicked.bind(this);
    this.handleOnDeleteButtonClicked = this.handleOnDeleteButtonClicked.bind(this);
  }

  initRender() { //change default values to passed props
    if(this.props.data !== undefined && JSON.stringify(this.props.data) !== JSON.stringify(this.data)) {
      this.data = this.props.data;
    }
    if(this.props.headerText !== undefined && JSON.stringify(this.props.headerText) !== JSON.stringify(this.headerText)) {
      this.headerText = this.props.headerText;
    }
  }

  handleOnSaveButtonClicked(data) {
    if (typeof this.props.onSaveButtonClicked === "function") {
      this.props.onSaveButtonClicked(data)
    }
  }

  handleOnDeleteButtonClicked(id) {
    if (typeof this.props.onDeleteButtonClicked === "function") {
      this.props.onDeleteButtonClicked(id)
    }
  }

  render() {
    this.initRender();

    return (
      <div className="modal-container">
        <input id="modal-toggle" type="checkbox" />
        <label className="modal-backdrop" htmlFor="modal-toggle"></label>
        <div className="modal-content">
          <label className="modal-close" htmlFor="modal-toggle">&#x2715;</label>
          <div className="modal-header">{this.headerText}</div>
          <div className="modal-form">
            <Form
              formData={this.data}
              onSaveButtonClicked={this.handleOnSaveButtonClicked}
              onDeleteButtonClicked={this.handleOnDeleteButtonClicked}
            />
          </div>
        </div>
        <style jsx>
          {`
            .modal-header {
              width: 100%;
              text-align: center;
              padding: 15px 0;
              border-bottom: 1px solid lightgrey;
              color: grey;
              font-weight: 400;
            }
            .modal-form {
              box-sizing: border-box;
              width: 100%;
              height: 420px;
              padding: 20px;
            }
            .modal-container .modal-btn {
              display: block;
              margin: 0 auto;
              color: #fff;
              width: 160px;
              height: 50px;
              line-height: 50px;
              background: #446CB3;
              font-size: 22px;
              border: 0;
              border-radius: 3px;
              cursor: pointer;
              text-align: center;
              box-shadow: 0 5px 5px -5px #333;
              transition: background 0.3s ease-in;
            }
            .modal-container .modal-btn:hover {
              background: #365690;
            }
            .modal-container .modal-content,
            .modal-container .modal-backdrop {
              height: 0;
              width: 0;
              opacity: 0;
              visibility: hidden;
              overflow: hidden;
              cursor: pointer;
              transition: opacity 0.2s ease-in;
            }
            .modal-container .modal-close {
              color: #aaa;
              position: absolute;
              right: 10px;
              top: 10px;
              padding-top: 3px;
              background: #fff;
              font-size: 16px;
              width: 25px;
              height: 25px;
              font-weight: bold;
              text-align: center;
              cursor: pointer;
            }
            .modal-container .modal-close:hover {
              color: #333;
            }
            .modal-container .modal-content-btn {
              position: absolute;
              text-align: center;
              cursor: pointer;
              bottom: 20px;
              right: 30px;
              background: #446CB3;
              color: #fff;
              width: 50px;
              border-radius: 2px;
              font-size: 14px;
              height: 32px;
              padding-top: 9px;
              font-weight: normal;
            }
            .modal-container .modal-content-btn:hover {
              color: #fff;
              background: #365690;
            }
            .modal-container #modal-toggle {
              display: none;
            }
            .modal-container #modal-toggle.active ~ .modal-backdrop, .modal-container #modal-toggle:checked ~ .modal-backdrop {
              background-color: rgba(0, 0, 0, 0.6);
              width: 100vw;
              height: 100vh;
              position: fixed;
              left: 0;
              top: 0;
              z-index: 9;
              visibility: visible;
              opacity: 1;
              transition: opacity 0.2s ease-in;
            }
            .modal-container #modal-toggle.active ~ .modal-content, .modal-container #modal-toggle:checked ~ .modal-content {
              opacity: 1;
              background-color: #fff;
              max-width: 480px;
              width: 480px;
              height: 600px;
              position: fixed;
              left: calc(50% - 200px);
              top: 12%;
              border-radius: 4px;
              z-index: 999;
              pointer-events: auto;
              cursor: auto;
              visibility: visible;
              box-shadow: 0 3px 7px rgba(0, 0, 0, 0.6);
            }
          `}
        </style>
      </div>
    );
  }
}

export default Modal;
