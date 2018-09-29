import React, { Component } from 'react';
import "isomorphic-fetch";

import Sidebar from '../Common_Sidebar/Common_Sidebar.js';
import ImagesGallery from '../Common_ImagesGallery/Common_ImagesGallery.js';
import ImageProfile from '../Common_ImageProfile/Common_ImageProfile.js';
import Modal from '../Common_Modal/Common_Modal.js';

const DEFAULT_SIDEBAR = 'profil';

const API_DOMAIN = 'http://aryswisnu.com';
const API_GET_CUSTOMER_URL = '/api/oy/getCustomer.php?id=';
const API_UPDATE_PRODUCT_URL = '/api/oy/updateProduct.php';
const API_DELETE_PRODUCT_URL = '/api/oy/deleteProduct.php';
const API_UPDATE_PROFILE_URL = '/api/oy/updateProfile.php';

const TIMEOUT = 5000;
const FETCH_DELAY = 500;

class UserInfomation extends Component {
  //set default values
  activeHeader = "";
  dummyUserSession = {userId: '1'}
  defaultModalData = {}

  constructor(props) {
    super(props);

    this.state = {
      currentSidebar: DEFAULT_SIDEBAR,
      profileData: {},
      isLoading: true,
      isOpenModal: false,
      modalData: this.defaultModalData
    }
    this.handleSidebarChanged = this.handleSidebarChanged.bind(this);
    this.handleImageClicked = this.handleImageClicked.bind(this);
    this.handleAddProduct = this.handleAddProduct.bind(this);
    this.handleOnSaveButtonClicked = this.handleOnSaveButtonClicked.bind(this);
    this.handleOnDeleteButtonClicked = this.handleOnDeleteButtonClicked.bind(this);
    this.handleUpdateProfileImage = this.handleUpdateProfileImage.bind(this);
  }

  componentDidMount() {
    this.callGetAPI(this.dummyUserSession.userId);
  }

  callGetAPI(userId) {
    var url = API_DOMAIN + API_GET_CUSTOMER_URL + userId;

    fetch(url, {
      method: 'GET',
      timeout: TIMEOUT,
      cache: 'no-cache'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson) {
        setTimeout(() => {
          this.setState({
            isLoading: false,
            profileData: responseJson.result
          })
        }, FETCH_DELAY);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  callPostAPI(body, url) {
    url = API_DOMAIN + url;

    fetch(url, {
      method: 'POST',
      body: body
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson && responseJson.status) {
        this.setState({isLoading: true});
        this.callGetAPI(this.dummyUserSession.userId);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  initRender() { //change default values to passed props
    if(this.props.activeHeader !== undefined && this.props.activeHeader !== this.activeHeader) {
      this.activeHeader = this.props.activeHeader;
    }
  }

  handleSidebarChanged(sidebar_id) {
    this.setState({currentSidebar: sidebar_id});
  }

  handleAddProduct() {
    this.setState({
      isOpenModal: true,
      modalData: this.defaultModalData
    });
  }

  handleImageClicked(modalData) {
    this.setState({
      isOpenModal: true,
      modalData: modalData
    });
  }

  handleOnSaveButtonClicked(data) {
    var formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    if (data["customer_id"] === undefined) {
      formData.append("customer_id", this.dummyUserSession.userId);
    }
    this.callPostAPI(formData, API_UPDATE_PRODUCT_URL)
  }

  handleOnDeleteButtonClicked(id) {
    var formData = new FormData();
    formData.append("id", id);
    this.callPostAPI(formData, API_DELETE_PRODUCT_URL)
  }

  handleUpdateProfileImage(imageData) {
    var formData = new FormData();
    formData.append("id", this.dummyUserSession.userId);
    formData.append("image", imageData);
    this.callPostAPI(formData, API_UPDATE_PROFILE_URL)
  }

  render() {
    this.initRender();

    return (
      <div className="user-information-container">
        <div className="sidebar">
          <Sidebar
            defaultSidebar={DEFAULT_SIDEBAR}
            fontSize={14}
            fontWeight={700}
            activeMenu={this.activeHeader}
            onSidebarChanged={this.handleSidebarChanged}
          />
        </div>
        {this.state.currentSidebar === 'profil' && this.state.isLoading &&
          <div className="loading"><i className="fa fa-spinner fa-spin"></i> Memuat profil...</div>
        }
        {this.state.currentSidebar === 'profil' && this.state.profileData && Object.keys(this.state.profileData).length > 0 &&
          <div className="user-information-add-product">
            <label htmlFor="modal-toggle">
              <span onClick={this.handleAddProduct}>+ Tambah barang</span>
            </label>
          </div>
        }
        {this.state.currentSidebar === 'profil' && this.state.profileData && Object.keys(this.state.profileData).length > 0 &&
          <div className="user-information-content">
            <div className="user-information-profile">
              <ImageProfile
                url={this.state.profileData.image}
                hoverFontSize={19}
                hoverText={"Ganti foto"}
                onImageChanged={this.handleUpdateProfileImage}
              />
            </div>
            {this.state.profileData.products && this.state.profileData.products.length > 0 &&
              <div className="user-information-gallery">
                <ImagesGallery
                  data={this.state.profileData.products}
                  hoverFontSize={14}
                  hoverFontWeight={400}
                  onImageClicked={this.handleImageClicked}
                  onSaveButtonClicked={this.handleOnSaveButtonClicked}
                  onDeleteButtonClicked={this.handleOnDeleteButtonClicked}
                />
              </div>
            }
            {!this.state.isLoading && this.state.profileData.products && this.state.profileData.products.length === 0 &&
              <div className="not-found">Belum memiliki produk :(</div>
            }
            {!this.state.isLoading && this.state.isOpenModal &&
              <Modal
                headerText={"Detail barang"}
                data={this.state.modalData}
                onSaveButtonClicked={this.handleOnSaveButtonClicked}
                onDeleteButtonClicked={this.handleOnDeleteButtonClicked}
              />
            }
          </div>
        }

        <style jsx>
          {`
            .user-information-content {
              float: left;
              width: 70%;
              margin: 110px 10% 80px 22%;
              background: white;
              border-radius: 5px;
              border: 2px solid #eae9ea;
              box-sizing: border-box;
            }
            .user-information-profile {
              text-align: center;
              margin-top: -80px;
            }
            .user-information-gallery {
              padding: 25px;
              // margin-top: 20px;
              box-sizing: border-box;
            }
            .not-found {
              width: 100%;
              text-align: center;
              margin: 100px 0 150px;
            }
            .sidebar {
              position: fixed;
              float: left;
              width: 15%;
            }
            .loading {
              font-size: 22px;
              margin: 30px 17%;
              position: absolute;
            }
            .user-information-add-product {
              color: #3a759d;
              font-weight: 700;
              cursor: pointer;
              margin: 70px 22% 0px;
              position: absolute;
              float: left;
            }
          `}
        </style>
      </div>
    );
  }
}

export default UserInfomation;
