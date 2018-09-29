import React, { Component } from 'react';
import Input from '../Common_Input/Common_Input.js';
import Button from '../Common_Button/Common_Button.js';

class Form extends Component {
  //set default values
  formData = {
    image: "",
    title: "",
    description: "",
    price: ""
  }

  constructor(props) {
    super(props);
    this.handleTitleOption = this.handleTitleOption.bind(this);
    this.handleDescriptionOption = this.handleDescriptionOption.bind(this);
    this.handlePriceOption = this.handlePriceOption.bind(this);
    this.handleSaveProduct = this.handleSaveProduct.bind(this);
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
    this.handleImageOption = this.handleImageOption.bind(this);
  }

  initRender() { //change default values to passed props
    if(this.props.formData !== undefined && JSON.stringify(this.props.formData) !== JSON.stringify(this.formData) && Object.keys(this.props.formData).length > 0) {
      this.formData = this.props.formData;
    }
  }

  handleTitleOption(value) {
    this.formData.title = value;
  }

  handleDescriptionOption(value) {
    this.formData.description = value;
  }

  handlePriceOption(value) {
    this.formData.price = value;
  }

  handleSaveProduct() {
    if (typeof this.props.onSaveButtonClicked === "function") {
      this.props.onSaveButtonClicked(this.formData)
    }
  }

  handleDeleteProduct() {
    if (typeof this.props.onDeleteButtonClicked === "function") {
      this.props.onDeleteButtonClicked(this.formData.id)
    }
  }

  handleImageOption(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (data) => {
      this.formData.image = data.target.result;
    }
  }

  render() {
    this.initRender();

    return (
      <div className="form-container">
        <div className="form-image-container">
          <div className="form-image">
            {this.formData.image === "" ?
              <input type="file" ref="file" name="file" onChange={this.handleImageOption} />
              :
              <img src={this.formData.image} alt="" />
            }
          </div>
        </div>
        <div className="form-input">
          <Input
            id={"title"}
            type={"text"}
            placeholder={"Judul barang"}
            defaultValue={this.formData.title}
            onChange={this.handleTitleOption}
          />
        </div>
        <div className="form-input">
          <Input
            id={"description"}
            type={"text"}
            placeholder={"Deskripsi barang"}
            defaultValue={this.formData.description}
            onChange={this.handleDescriptionOption}
          />
        </div>
        <div className="form-input">
          <Input
            id={"price"}
            type={"text"}
            placeholder={"Harga barang"}
            defaultValue={this.formData.price}
            onChange={this.handlePriceOption}
          />
        </div>
        <div className="form-button">
          <Button
            text={"Simpan"}
            backgroundColor={"#3a759d"}
            onClick={this.handleSaveProduct}
          />
        </div>
        {Object.keys(this.props.formData) && Object.keys(this.props.formData).length > 0 &&
          <div className="form-button">
            <Button
              text={"Hapus"}
              backgroundColor={"#C73336"}
              onClick={this.handleDeleteProduct}
            />
          </div>
        }
        <style jsx>
          {`
            .form-container {
              overflow-y: auto;
              height: 500px;
            }
            .form-image-container {
              width: 100%;
              text-align: center;
            }
            .form-image {
              width: 300px;
              margin: auto;
            }
            .form-image img {
              max-width: 100%;
            }
            .form-input {
              margin: 20px 0;
            }
            .form-button {
              margin: 30px 50px 10px;
            }
            .form-button:last-child {
              margin: 0px 50px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Form;
