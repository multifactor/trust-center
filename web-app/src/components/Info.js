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

export default Info;
