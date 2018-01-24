import React from 'react';

const Input = ({ type, value, onChange }) => (
  <input
    type={type}
    className="input"
    value={value}
    onChange={({ target }) => onChange(target.value)}
  />
);

export { Input };
