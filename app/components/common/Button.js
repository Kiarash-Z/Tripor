import React from 'react';

const Button = ({ onClick, color, children, large })=> (
  <button onClick={onClick} className={`button button-${color}`}>
    {children}
  </button>
);

export { Button };
