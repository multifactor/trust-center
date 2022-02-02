import React from 'react';
import {Link} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import logo from './img/logo.png';
import Attribute from './components/Attribute';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modal: false}
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.setState({modal: true})
  }

  closeModal() {
    this.setState({modal: false})
  }

  render() {
    const sdk = document.getElementById('sdk')
    return (<>
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Trust Center" height="30" />
          </Link>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="https://trust.multifactor.com">Tools</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://trust.multifactor.com/sdk">SDK</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://github.com/multifactor/trust-center">Source Code</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://trust.multifactor.com/docs">Documentation</a>
            </li>
          </ul>
          <form className="d-flex">
            <button className="btn btn-secondary my-2 my-sm-0" onClick={this.openModal}>Security</button>
          </form>
        </div>
      </nav>
      <Modal show={this.state.modal} onHide={this.closeModal}>
        <div className="modal-header">
          <h5 className="modal-title">Security Information</h5>
          <button onClick={this.closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true"></span>
          </button>
        </div>
        <div className="modal-body">
          <div className="verified-attr">
            <Attribute name="SDK version" only={sdk.getAttribute('src').split('/')[4]} />
            <Attribute name="SDK sha256" only={sdk.getAttribute('integrity').split('-')[1]} />
          </div>
          <ul className="mb-0">
            <li>The trust center is entirely open source, and is hosted on <a className="link" href="https://github.com/multifactor/trust-center/tree/gh-pages" target="_blank" rel="noreferrer"><i className="fas fa-external-link-alt" />&nbsp;&thinsp;GitHub Pages</a> to ensure public auditability.</li>
            <li>Once loaded, this page requires no network connectivity. Feel free to disconnect your network while using it.</li>
            <li>Ensure the current domain is <a className="link" href="https://trust.multifactor.com">trust.multifactor.com</a>.</li>
          </ul>
        </div>
      </Modal>
    </>)
  }
}

export default Navigation;
