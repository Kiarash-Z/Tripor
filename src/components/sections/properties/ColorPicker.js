import React from 'react';
import { ChromePicker } from 'react-color';

import { Input, Button } from '../../common';

const ColorPicker = ({
  isOpen,
  togglePicker,
  color,
  inputColorValue,
  handleInputKeyDown,
  handleInputChange,
  updateObjectColor,
}) => (
  <div className="properties__color-container mt-4">
    <Button
      onClick={togglePicker}
      style={{ backgroundColor: color }}
    />
    { isOpen ? <div className="properties__color-container__popover">
      <div className='properties__color-container__cover' onClick={togglePicker} />
      <ChromePicker
        disableAlpha
        color={color}
        onChangeComplete={updateObjectColor}
      />
    </div> : null }
    <Input
      className="properties__border ml-1"
      value={inputColorValue}
      onKeyDown={handleInputKeyDown}
      onChange={handleInputChange}
    />
  </div>
);

export default ColorPicker;
