import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

@inject('appStore')
@observer
class Input extends Component {
  render() {
    const {
      type,
      value,
      onChange,
      className,
      id,
      placeholder,
      style,
      onClick,
      onKeyDown,
    } = this.props;
    const { appStore } = this.props;
    return (
      <input
        type={type}
        className={`${className} input`}
        value={value}
        placeholder={placeholder}
        onChange={({ target }) => onChange(target.value)}
        onClick={onClick}
        style={style}
        onFocus={() => { appStore.isTyping = true; }}
        onBlur={() => { appStore.isTyping = false; }}
        onKeyDown={onKeyDown}
        id={id}
      />
    );
  }
}

export { Input };
