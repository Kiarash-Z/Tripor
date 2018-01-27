import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { ChromePicker } from 'react-color';

import { Input, Button } from '../../common';

@inject('viewStore')
@observer
class Properties extends Component {
  render() {
    const { viewStore } = this.props;
    return (
      <aside className="properties">
        <h1 className="properties__title pb-2 font-small mb-4">Properties</h1>
        <div className="properties__section">
          <h2 style={{ fontWeight: 100 }} className="font-tiny">BACKGROUND</h2>
            <div className="properties__color-container mt-4">
              <Button
                onClick={() => { viewStore.isColorPickerOpen = !viewStore.isColorPickerOpen; }}
                style={{ backgroundColor: viewStore.canvasBackground }}
              />
              { viewStore.isColorPickerOpen ? <div className="properties__color-container__popover">
                <div className='properties__color-container__cover' onClick={() => { viewStore.isColorPickerOpen = false; }} />
                <ChromePicker
                  color={viewStore.canvasBackground}
                  onChangeComplete={({ hex }) => viewStore.updateCanvasBackground(hex)}
                />
              </div> : null }
              <Input
                className="properties__border ml-1"
                value={viewStore.canvasBackground}
                onKeyDown={viewStore.handleInputChange}
                onChange={value => { viewStore.canvasBackground = value.toUpperCase(); }}
                onFocus={() => { viewStore.isTyping = true; }}
                onBlur={() => { viewStore.isTyping = false; }}
              />
            </div>
        </div>
      </aside>
    );
  }
}

export default Properties;
