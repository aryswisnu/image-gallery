import React, { Component } from 'react';
import ImagesGalleryItem from '../Common_ImagesGalleryItem/Common_ImagesGalleryItem.js';

class ImagesGallery extends Component {
  //set default values
  data = {};

  constructor() {
    super();

    this.handleImageClicked = this.handleImageClicked.bind(this);
  }

  initRender() { //change default values to passed props
    if(this.props.data !== undefined && JSON.stringify(this.props.data) !== JSON.stringify(this.data)) {
      this.data = this.props.data;
    }
  }

  handleImageClicked(data) {
    if (typeof this.props.onImageClicked === "function") {
      this.props.onImageClicked(data);
    }
  }

  render() {
    this.initRender();

    var renderImageItem = (image) => {
      return image.map((item, index) => {
        return (
          <ImagesGalleryItem
            key={index}
            data={item}
            onImageClicked={this.handleImageClicked}
          />
        )
      })
    }

    return (
      <div className="images-gallery-container">
        {this.data && Object.keys(this.data).length > 0 &&
          renderImageItem(this.props.data)
        }
        <style jsx>
          {`
            .images-gallery-container {
              display: flex;
              justify-content: start;
              flex-wrap: wrap;
              position: relative;
            }
          `}
        </style>
      </div>
    );
  }
}

export default ImagesGallery;
