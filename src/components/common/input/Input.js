import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const {
      value,
      onChange,
      placeholder,
      type,
      name,
      icon
    } = this.props;

    return (
      <div className="pt-input-group pt-large">
        <span className={`pt-icon ${icon}`} />
        <input
          className="pt-input pt-large"
          type={type}
          placeholder={placeholder}
          dir="auto"
          value={value}
          onChange={(e) => onChange(e)}
          name={name}
        />
      </div>
    );
  }
}

Input.displayName = 'App.Input';
Input.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string
};

export default Input;