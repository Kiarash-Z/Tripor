import React from 'react';

import { Button, Input } from '../../common';

const TextProperties = ({ alignments, onChangeALignment, fontSize, lineHeight, updateProperty }) => {
  const renderAlignments = () => alignments.map(alignment => (
    <Button
      key={alignment.id}
      bordered={false}
      className="mr-2"
      style={{ background: alignment.isSelected ? '#60C1F9' : '#d4d4d4', padding: '0.3rem 0.5rem' }}
      onClick={() => onChangeALignment(alignment.id, alignment.align)}
    >
      <i className={alignment.icon} style={{ color: 'white' }}/>
    </Button>
  ))
  return (
    <div className="properties__section">
      <h2 style={{ fontWeight: 100 }} className="font-tiny mb-3">TEXT</h2>
      <div style={{ display: 'flex' }}>
        {renderAlignments()}
      </div>
      <div className="properties__positioner-container mt-3">
        <div className="properties__positioner-container__item mr-2">
            <i className="font-tiny tripor-text-size"></i>
            <Input
              className="properties__border ml-1"
              value={fontSize.toFixed()}
              onChange={value => updateProperty('fontSize', value, true)}
              style={{ width: '100%' }}
              type="number"
            />
        </div>
        <div className="properties__positioner-container__item">
            <i className="font-tiny tripor-line-height"></i>
            <Input
              className="properties__border ml-1"
              value={lineHeight.toFixed()}
              onChange={value => updateProperty('lineHeight', value, true)}
              style={{ width: '100%' }}
              type="number"
            />
        </div>
      </div>
    </div>
  )
};

export default TextProperties;
