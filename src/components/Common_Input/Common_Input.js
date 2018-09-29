import React, { Component } from 'react';

class Input extends Component {
  //set default values
  id = "";
  type = "text";
  placeholder = "";
  defaultValue = "";
  isDataList = false;

  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue || ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  initRender() { //change default values to passed props
    if(this.props.id !== undefined && this.props.id !== this.id) {
      this.id = this.props.id;
    }
    if(this.props.type !== undefined && this.props.type !== this.type) {
      this.type = this.props.type;
    }
    if(this.props.placeholder !== undefined && this.props.placeholder !== this.placeholder) {
      this.placeholder = this.props.placeholder;
    }
    if(this.props.defaultValue !== undefined && this.props.defaultValue !== this.defaultValue) {
      this.defaultValue = this.props.defaultValue;
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.defaultValue !== this.defaultValue) {
      this.setState({value: nextProps.defaultValue}); //update value based on latest defaultValue
    }
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.refs[this.id].value); //callback to parent
    }
  }

  getValue() {
    return this.refs[this.id].value;
  }

  shouldComponentUpdate(nextProps, nextState) {
    //prevent unnecessary re-render
    return (
      this.state.value !== nextState.value
    )
  }

  render() {
    this.initRender();

    return (
      <div className="input-container">
        <div className="input-field-container">
          <input
            id={this.id}
            className={"input-field-content"}
            ref={this.id}
            type={this.type}
            placeholder={this.placeholder}
            onKeyPress={this.handlePressEnter}
            onChange={this.handleChange}
            onFocus={this.handleOnFocus}
            value={this.state.value}
          />
          <label htmlFor={this.id} className="input-label">{this.placeholder}</label>
        </div>
        <style jsx>
          {`
            .input-field-container {
              position: relative;
              padding: 15px 0 0;
            }
            .input-field-content {
              width: 100%;
              font-family: inherit;
              border: 0;
              border-bottom: 1px solid #d2d2d2;
              outline: 0;
              font-size: 14px;
              color: #212121;
              padding: 7px 0;
              background: transparent;
              transition: border-color 0.2s;
            }
            .input-field-content::placeholder {
              color: transparent;
            }
            .input-field-content:placeholder-shown ~ .input-label {
              font-size: 14px;
              cursor: text;
              top: 20px;
            }
            label, .input-field-content:focus ~ .input-label {
              position: absolute;
              top: 0;
              display: block;
              transition: 0.2s;
              font-size: 12px;
              color: #9b9b9b;
            }
            .input-field-content:focus ~ .input-label {
              color: #3a759d;
            }
            .input-field-content:focus {
              padding-bottom: 6px;
              border-bottom: 2px solid #3a759d;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Input;
