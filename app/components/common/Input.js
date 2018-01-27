import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type,
  value,
  onChange,
  className,
  placeholder,
  style,
  onClick,
  onKeyDown,
  onFocus,
  onBlur,
}) => (
  <input
    type={type}
    className={`${className} input`}
    value={value}
    placeholder={placeholder}
    onChange={({ target }) => onChange(target.value)}
    onClick={onClick}
    style={style}
    onFocus={onFocus}
    onBlur={onBlur}
    onKeyDown={onKeyDown}
  />
);

export { Input };
