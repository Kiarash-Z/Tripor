import React from 'react';

const CanvasZoom = ({ onZoomIn, onZoomOut, zoomPercentage }) => (
  <div className="mr-3 pointer font-small">
    <i
      className="tripor-minus p-2 font-small"
      style={{ color: 'white' }}
      onClick={onZoomOut}
    />
    <span style={{ color: 'white' }}>{zoomPercentage}</span>
    <i
      className="tripor-plus p-2 font-small"
      style={{ color: 'white' }}
      onClick={onZoomIn}
    />
  </div>
);

export default CanvasZoom;
