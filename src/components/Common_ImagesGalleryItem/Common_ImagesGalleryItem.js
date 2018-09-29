import React, { Component } from 'react';

class ImagesGalleryItem extends Component {
  //set default values
  data = {}

  initRender() { //change default values to passed props
    if(this.props.data !== undefined && JSON.stringify(this.props.data) !== JSON.stringify(this.data)) {
      this.data = this.props.data;
    }
  }

  handleImageItemClicked(data) {
    if (typeof this.props.onImageClicked === "function") {
      this.props.onImageClicked(data);
    }
  }

  render() {
    this.initRender();

    return (
      <div className="images-gallery-cell" onClick={() => {this.handleImageItemClicked(this.data)}}>
        <label htmlFor="modal-toggle" style={{textAlign: "center"}}>
          <div className="images-gallery-item">
            <div className="images-gallery-item-overlay"></div>
            <img className="images-gallery-item-image" src={this.data.image} alt=""/>
            <div className="images-gallery-item-details fadeIn-bottom">
              <h3 className="images-gallery-item-title">{this.data.title}</h3>
              <p className="images-gallery-item-text">Klik untuk detail</p>
            </div>
          </div>
        </label>
        <style jsx>
          {`
            .images-gallery-cell{
              padding: 1em 0;
              float: left;
              width: 50%;
            }
            @media screen and (max-width: 640px){
              .images-gallery-cell{
                display: block;
                width: 100%;
              }
            }
            @media screen and (min-width: 900px){
              .images-gallery-cell{
                width: 33.33333%;
              }
            }
            .images-gallery-cell .title{
              color: #1a1a1a;
              text-align: center;
              margin-bottom: 10px;
            }
            .images-gallery-item {
              position: relative;
              width: 90%;
              max-width: 400px;
              margin: auto;
              cursor: pointer;
              overflow: hidden;
              border-radius: 3px;
            }
            .images-gallery-item .images-gallery-item-overlay {
              background: rgba(0,0,0,0.7);
              position: absolute;
              height: 99%;
              width: 100%;
              left: 0;
              top: 0;
              bottom: 0;
              right: 0;
              cursor: pointer;
              opacity: 0;
              -webkit-transition: all 0.4s ease-in-out 0s;
              -moz-transition: all 0.4s ease-in-out 0s;
              transition: all 0.4s ease-in-out 0s;
            }
            .images-gallery-item:hover .images-gallery-item-overlay{
              opacity: 1;
            }
            .images-gallery-item-image{
              width: 100%;
            }
            .images-gallery-item-details {
              position: absolute;
              text-align: center;
              padding-left: 1em;
              padding-right: 1em;
              width: 100%;
              top: 50%;
              left: 50%;
              opacity: 0;
              -webkit-transform: translate(-50%, -50%);
              -moz-transform: translate(-50%, -50%);
              transform: translate(-50%, -50%);
              -webkit-transition: all 0.3s ease-in-out 0s;
              -moz-transition: all 0.3s ease-in-out 0s;
              transition: all 0.3s ease-in-out 0s;
            }
            .images-gallery-item:hover .images-gallery-item-details{
              top: 50%;
              left: 50%;
              opacity: 1;
            }
            .images-gallery-item-details h3{
              color: #fff;
              font-weight: 500;
              letter-spacing: 0.15em;
              margin-bottom: 0.5em;
              text-transform: uppercase;
            }
            .images-gallery-item-details p{
              color: #fff;
              font-size: 0.8em;
            }
            .fadeIn-bottom{
              top: 80%;
            }
            .fadeIn-top{
              top: 20%;
            }
            .fadeIn-left{
              left: 20%;
            }
            .fadeIn-right{
              left: 80%;
            }
          `}
        </style>
      </div>
    );
  }
}

export default ImagesGalleryItem;
