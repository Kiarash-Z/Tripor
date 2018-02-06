import React from 'react';

import { Input } from '../../common';

const ObjectProperties = ({ properties, updateProperty }) => {
  const { left, top, width, height, angle } = properties;
  return (
    <div className="properties__section">
      <h2 style={{ fontWeight: 100 }} className="font-tiny">ADJUSTMENTS</h2>
      <div className="properties__positioner-container mt-4">
        <div className="properties__positioner-container__item mr-4 mb-2">
          <label className="font-tiny" htmlFor="X">X</label>
          <Input
            className="properties__border ml-1"
            value={left.toFixed()}
            onChange={value => updateProperty('left', value, true)}
            id="X"
            style={{ width: '100%' }}
            type="number"
          />
        </div>
        <div className="properties__positioner-container__item mb-2">
          <label className="font-tiny" htmlFor="Y">Y</label>
          <Input
            className="properties__border ml-1"
            value={top.toFixed()}
            onChange={value => updateProperty('top', value, true)}
            id="Y"
            style={{ width: '100%' }}
            type="number"
          />
        </div>
        <div className="properties__positioner-container__item mr-4 mb-2">
          <label className="font-tiny" htmlFor="X">W</label>
          <Input
            className="properties__border ml-1"
            value={width.toFixed()}
            onChange={value => updateProperty('width', value, true)}
            id="W"
            style={{ width: '100%' }}
            type="number"
          />
        </div>
        <div className="properties__positioner-container__item mb-2">
          <label className="font-tiny" htmlFor="H">H</label>
          <Input
            className="properties__border ml-1"
            value={height.toFixed()}
            onChange={value => updateProperty('height', value, true)}
            id="H"
            style={{ width: '100%' }}
            type="number"
          />
        </div>
        <div className="properties__positioner-container__item">
          <label className="font-tiny" htmlFor="angle">
            <i className="tripor-angle" />
          </label>
          <Input
            className="properties__border ml-1"
            value={angle.toFixed()}
            onChange={value => updateProperty('angle', value, true)}
            id="A"
            style={{ width: '100%' }}
            type="number"
          />
        </div>
      </div>
    </div>
  )
};

export default ObjectProperties;
