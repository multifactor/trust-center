import React from 'react';
import Dropzone from 'react-dropzone';

class Nitro extends React.Component {
  constructor(props) {
    super(props)
    this.state = {document: null}
    this.onUpload = this.onUpload.bind(this)
    this.verifyAttestation = this.verifyAttestation.bind(this)
  }

  async verifyAttestation(attestationDocument) {
    const attestationResult = await window.trust.enclaves.nitro.verifyAttestation(attestationDocument)
    console.log(attestationResult)
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
        <p className="lead">Validate AWS Nitro attestations and encrypt secrets for use in Nitro enclaves. Upload an attestation document in CBOR format or paste a base64-encoded document below to begin.</p>
      </div>
      <div className="row pt-4">
        <div className="col-6">
          <Dropzone onDrop={this.onUpload}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()} className="drop-zone">
                  <input {...getInputProps()} />
                  <h1 className="mb-3"><i className="fa fa-upload" /></h1>
                  <p>Drop a .CBOR file here, or click to select a file</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div className="col-6">

        </div>
      </div>
    </>)
  }
}

export default Nitro;
