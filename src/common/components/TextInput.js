import React from 'react';
import PropTypes from 'prop-types';
import { InputBase } from '@material-ui/core';

export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      [props.name]: props.defaultValue,
    };
    this.inputRef = { focus: () => {} };
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.focus = this.focus.bind(this);
    this.clear = this.clear.bind(this);
  }

  onChange({ target: { name, value } }) {
    this.setState({ [name]: value });
    this.props.onChange(value);
  }

  onKeyDown(e) {
    // if the user key-down an Enter key
    if(e.keyCode === 13) {
      this.props.onSubmit(this.state[this.props.name]);
    }
  }

  focus() {
    // don't simplify this assignment
    // due to js variable value & reference behavior
    this.inputRef.focus();
  }

  clear() {
    const { name, onChange, onClear } = this.props;
    this.setState({ [name]: '' });
    onClear ? onClear() : onChange('');
  }

  render() {
    // exclude these props to prevent it applied on the actual <input/>
    const { defaultValue, onClear, ...restProps } = this.props;
    return (
      <InputBase
        inputRef={e => (this.inputRef = e)}
        value={this.state[this.props.name]}
        autoComplete="off"
        onKeyDown={this.onKeyDown}
        {...restProps}
        onChange={this.onChange}
      />
    );
  }
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
};

TextInput.defaultProps = {
  onSubmit: () => {},
  onChange: () => {},
  defaultValue: '',
};
