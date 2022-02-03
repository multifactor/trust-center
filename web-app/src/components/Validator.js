import React from 'react';
import Validate from './Validate';

class Validator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.set = this.set.bind(this)
  }

  set(key) {
    return (value) => {
      let state = this.state
      state[key] = value
      this.setState(state)
      this.props.callback(Object.values(state).some(a => a === 'invalid'))
    }
  }

  render() {
    return (<>
      {this.props.items.map(item => <Validate key={item.key} name={item.name} info={item.info} text={item.text} value={item.value} default={item.default} callback={this.set(item.key)} />)}
    </>);
  }
}

export default Validator;
