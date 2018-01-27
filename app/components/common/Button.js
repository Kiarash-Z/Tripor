import React from 'react';

const Button = ({ onClick, color, children, style }) => (
  <button onClick={onClick} className={`button button-${color}`} style={style}>
    {children}
  </button>
);

export { Button };
