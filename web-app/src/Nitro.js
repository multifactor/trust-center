import React from 'react';
import Dropzone from 'react-dropzone';
import Cert from './components/Cert';
import Attribute from './components/Attribute';

class Nitro extends React.Component {
  constructor(props) {
    super(props)
    this.state = {result: null}
    this.onUpload = this.onUpload.bind(this)
    this.verifyAttestation = this.verifyAttestation.bind(this)
    this.retry = this.retry.bind(this)
  }

  retry() {
    this.setState({result: null})
  }

  async verifyAttestation(attestationDocument) {
    const attestationResult = await window.trust.enclaves.nitro.verifyAttestation(attestationDocument)
    console.log(attestationResult)
    this.setState({result: attestationResult})
  }

  onUpload(acceptedFiles) {
    const reader = new FileReader()
    reader.readAsArrayBuffer(acceptedFiles[0])
    reader.onload = () => {
      const binaryStr = reader.result
      this.verifyAttestation(binaryStr)
    }
  }

  render() {
    return (<>
      <div className="page-header mb-4">
        <h1>AWS Nitro Tools</h1>
        <p className="lead">Validate AWS Nitro attestations and encrypt secrets for use in Nitro enclaves. Upload an attestation document in CBOR format or paste a base64-encoded document below to begin. Sample attestation documents are available here: &nbsp;<a className="link" href="https://github.com/multifactor/trust-center/tree/main/test/examples" target="_blank" rel="noreferrer"><i className="fas fa-external-link-alt" />&nbsp;&thinsp;GitHub Repo</a></p>
      </div>
      <div className="row pt-4">
        <div className="col-6">
          {this.state.result ? <>{
            this.state.result.valid ? <>
              <div className="drop-zone valid mb-4">
                <h1 className="mb-3"><i className="fas fa-file-signature" /></h1>
                <p>Nitro attestation document signatures validated</p>
              </div>
              <div className="pt-3 verified-attr">
                <p className="text-success"><b><i className="fas fa-check-circle" /> Verified attributes</b></p>
                <Attribute name="Module ID" value={this.state.result.attr.module_id} />
                <Attribute name="Timestamp" value={this.state.result.attr.timestamp} clean={new Date(this.state.result.attr.timestamp).toLocaleString()} />
                <Attribute name="Digest" value={this.state.result.attr.digest} />
                <Attribute name="User Data" try={this.state.result.attr.user_data} />
                <Attribute name="Nonce" try={this.state.result.attr.nonce} />
                <Attribute name="PCRs" pcrs={this.state.result.attr} />
                <p className="text-success mt-3"><b><i className="fas fa-check-circle" /> Verification details</b></p>
                <Attribute name="Public Key" try={this.state.result.attr.public_key} />
                <Attribute name="Signature" try={this.state.result.attr.signature} />
                <Attribute name="Certificate">
                  <Cert cert={this.state.result.attr.certificate} />
                </Attribute>
                <div className="mb-2"></div>
                <Attribute name="CA Chain">
                  {this.state.result.attr.cabundle.reverse().map(cert =>
                  <Cert cert={cert} key={cert.serialNumber} />)}
                </Attribute>
                <div className="mb-2"></div>
                <Attribute name="CA Root">
                  <Cert cert={this.state.result.attr.caroot} />
                </Attribute>
              </div>
            </> : <div className="drop-zone invalid">
              <h1 className="mb-3"><i className="fas fa-file-excel" /></h1>
              <p>Nitro attestation document validation failed</p>
            </div>
          }</> : <Dropzone onDrop={this.onUpload}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()} className="drop-zone">
                  <input {...getInputProps()} />
                  <h1 className="mb-3"><i className="fa fa-upload" /></h1>
                  <p>Drop a .CBOR file here, or click to select a file</p>
                </div>
              </section>
            )}
          </Dropzone>}
        </div>
        <div className="col-6 position-relative">
          {this.state.result ? <>{
            this.state.result.valid ? <>
              <p>Nitro attestation document validated</p>
            </> : <>
              <h2 className="text-danger"><i className="fas fa-exclamation-triangle"></i>&nbsp;&thinsp;This document is invalid</h2>
              <p>{this.state.result.reason}. For security reasons, performing further operations without a valid attestation document is not currently supported.</p>
              <button type="button" className="btn btn-secondary" onClick={this.retry}><i className="fas fa-sync-alt" />&nbsp; Retry</button>
            </>
          }</> : <div className="form-group">
            <textarea className="form-control position-absolute h-100" placeholder="Or, paste a base64-encoded attestation document here"></textarea>
          </div>}
        </div>
      </div>
    </>)
  }
}

export default Nitro;
