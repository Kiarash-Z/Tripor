import React from 'react';

const Input = ({
  type,
  value,
  onChange,
  className,
  placeholder,
  style,
  onClick,
}) => (
  <input
    type={type}
    className={`${className} input`}
    value={value}
    placeholder={placeholder}
    onChange={({ target }) => onChange(target.value)}
    onClick={onClick}
    style={style}
  />
);

export { Input };
