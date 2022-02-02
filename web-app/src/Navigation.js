import React from 'react';
import {Link} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import logo from './img/logo.png';

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
          <p>Modal body text goes here.</p>
        </div>
      </Modal>
    </>)
  }
}

export default Navigation;
