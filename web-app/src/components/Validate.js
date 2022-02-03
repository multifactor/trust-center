import React from 'react';
import Info from './Info';

class Validate extends React.Component {
  constructor(props) {
    super(props)
    if (this.props.default) {
      if (this.props.default === this.props.value) {
        this.state = {status: 'valid'}
      } else {
        this.state = {status: 'invalid'}
      }
    } else {
      this.state = {status: null}
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const value = e.target.value;
    if (value.length === 0) {
      this.setState({status: null});
    } else if (value === this.props.value) {
      this.setState({status: 'valid'});
    } else {
      this.setState({status: 'invalid'});
    }
  }

  render() {
    var group = "form-group mb-3";
    var control = "form-control";

    if (this.state.status === "valid") {
      group += " has-success";
      control += " is-valid";
    }

    if (this.state.status === "invalid") {
      group += " has-danger";
      control += " is-invalid";
    }

    return (<div className={group}>
      <div className="input-group">
        <div className="input-group-text">
          {this.props.name} &nbsp;<Info info={this.props.info} />
        </div>
        <input type="text" onChange={this.onChange} className={control} placeholder={this.props.text} defaultValue={this.props.default} />
      </div>
    </div>);
  }
}

export default Validate;
