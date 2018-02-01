import React from 'react';

const Button = ({ onClick, color, children, style, bordered = true, className }) => (
  <button
    onClick={onClick}
    className={`button button-${color} ${bordered ? 'button-bordered' : ' '} ${className}`}
    style={style}
  >
    {children}
  </button>
);

export { Button };
