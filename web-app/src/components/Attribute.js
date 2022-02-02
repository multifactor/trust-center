import React from 'react';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

class Info extends React.Component {
  render() {
    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>{this.props.info}</Tooltip>
    );

    return (
      <OverlayTrigger placement="right" overlay={renderTooltip}>
        <i className="fa fa-info-circle"></i>
      </OverlayTrigger>
    )
  }
}

const pcrNames = {
  0: 'Enclave image file hash',
  1: 'Linux kernel and bootstrap hash',
  2: 'Application hash',
  3: 'Parent instance IAM role hash',
  4: 'Parent instance ID hash',
  8: 'Enclave image signing certificate hash',
}

class Attribute extends React.Component {
  render() {
    var pcrs = [];
    if (this.props.pcrs) {
      var unset = 0;
      for (let i = 0; i < 16; i++) {
        if (/^0*$/.test(this.props.pcrs['pcr' + i])) {
          unset++;
        } else {
          pcrs.push(<p key={'pcr-' + i} className="mb-0"><Info info={pcrNames[i] ? pcrNames[i] : 'Unknown PCR'} /> <span className="inline-label">PCR{i}:</span>{this.props.pcrs['pcr' + i]}</p>)
        }
      }
      pcrs.push(<p key={'pcr-unset'} className="text-muted">+ {unset} PCRs Not Set</p>)
    }
    const ascii = /^[ -~]+$/;
    return (<div className="row">
      <div className="col-3"><p className={this.props.last ? 'mb-0' : ''}><b>{this.props.name}</b></p></div>
      <div className="col-9">
        {this.props.only && <p>{this.props.only}</p>}
        {this.props.value && <p className="mb-0">{this.props.value}</p>}
        {this.props.clean && <p className="text-muted">{this.props.clean}</p>}
        {this.props.try === null && <p className="mb-0">NULL</p>}
        {this.props.try && <>
          <p className="mb-0">{this.props.try.toString('hex')}</p>
          {ascii.test(this.props.try.toString()) && <p className="text-muted">{this.props.try.toString()}</p>}
        </>}
        {pcrs}
        {this.props.children}
      </div>
    </div>)
  }
}

export default Attribute;
