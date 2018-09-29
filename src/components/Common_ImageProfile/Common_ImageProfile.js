import React, { Component } from 'react';

class ImagesProfile extends Component {
  //set default values
  hoverFontSize = 14;
  hoverText = "";
  url = "";

  constructor(props) {
    super(props);
    this.handleOnImageChanged = this.handleOnImageChanged.bind(this);
  }

  initRender() { //change default values to passed props
    if(this.props.hoverFontSize !== undefined && this.props.hoverFontSize !== this.hoverFontSize) {
      this.hoverFontSize = this.props.hoverFontSize;
    }
    if(this.props.hoverText !== undefined && this.props.hoverText !== this.hoverText) {
      this.hoverText = this.props.hoverText;
    }
    if(this.props.url !== undefined && this.props.url !== this.url) {
      this.url = this.props.url;
    }
  }

  handleOnImageChanged(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (data) => {
      if (typeof this.props.onImageChanged === "function") {
        this.props.onImageChanged(data.target.result);
      }
    }
  }

  render() {
    this.initRender();

    return (
      <form ref="profileForm" onSubmit={this.handleSubmit}>
        <div className="images-profile-container">
          <label>
            <input type="file" style={{display: 'none'}} onChange={this.handleOnImageChanged}/>
            <img src={this.url} alt="" />
            <div className="images-profile-overlay">
              <span className="images-profile-overlay-text">{this.hoverText}</span>
            </div>
          </label>
        </div>
        <style jsx>
          {`
            .images-profile-container {
              cursor: pointer;
              display: inline-block;
              position: relative;
              width: 150px;
              height: 150px;
              line-height: 150px;
              background-color: white;
              overflow: hidden;
              border-radius: 50%;
              border: 2px solid #eae9ea;
            }
            .images-profile-container img {
              width: 150px;
              position: relative;
              vertical-align: middle;
            }
            .images-profile-container label {
              cursor: pointer;
            }

            .images-profile-overlay {
              position: relative;
              background: rgba(0, 0, 0, 0.75);
              text-align: center;
              opacity: 0;
              -webkit-transition: opacity 0.25s ease;
              -moz-transition: opacity 0.25s ease;
              margin-top: -152px;
              width: 150px;
              height: 152px;
              line-height: 150px;
            }
            .images-profile-overlay-text {
              float: left;
              font-weight: 600;
              color: rgba(255, 255, 255, 0.85);
              font-size: ${this.hoverFontSize}px;
              width: 150px;
              height: 150px;
              white-space: initial;
              vertical-align: middle;
            }
            .images-profile-container:hover .images-profile-overlay {
              opacity: 1;
            }
          `}
        </style>
      </form>
    );
  }
}

export default ImagesProfile;
