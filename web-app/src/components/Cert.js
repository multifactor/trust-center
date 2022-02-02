import React from 'react';
import Modal from "react-bootstrap/Modal";
import Attribute from './Attribute';

class Cert extends React.Component {
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
      <div className="cert mb-2">
        <div className="row">
          <div className="col-3">
            <button onClick={this.openModal} className="btn btn-secondary my-2 my-sm-0 btn-block"><i className="fas fa-clipboard-list" />&nbsp; Details</button>
          </div>
          <div className="col-9">
            <p className="mb-0 text-muted">{this.props.cert.subject}</p>
            <p className="mb-0 text-muted">{this.props.cert.serialNumber}</p>
          </div>
        </div>
      </div>
      <Modal show={this.state.modal} onHide={this.closeModal}>
        <div className="modal-header">
          <h5 className="modal-title">Certificate Details</h5>
          <button onClick={this.closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true"></span>
          </button>
        </div>
        <div className="modal-body">
          <Attribute name="Subject" only={this.props.cert.subject} />
          <Attribute name="Issuer" only={this.props.cert.issuer} />
          <Attribute name="Valid From" value={this.props.cert.notBefore.getTime()} clean={new Date(this.props.cert.notBefore).toLocaleString()} />
          <Attribute name="Valid To" value={this.props.cert.notAfter.getTime()} clean={new Date(this.props.cert.notAfter).toLocaleString()} />
          <div className="verified-attr">
            <Attribute name="Public Key" try={this.props.cert.publicKey} />
            <Attribute name="Serial No." value={this.props.cert.serialNumber} last />
          </div>
        </div>
      </Modal>
    </>)
  }
}

export default Cert;
