import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import ColorPicker from './ColorPicker';

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
          <ColorPicker
            isOpen={viewStore.isColorPickerOpen}
            togglePicker={() => { viewStore.isColorPickerOpen = !viewStore.isColorPickerOpen; }}
            color={viewStore.activeBackground.toUpperCase()}
            inputColorValue={viewStore.inputColorValue.toUpperCase()}
            handleInputKeyDown={viewStore.handleColorApply}
            handleFocusToggle={() => { viewStore.isTyping = !viewStore.isTyping; }}
            handleInputChange={value => { viewStore.inputColorValue = value.toUpperCase(); }}
            updateObjectColor={({ hex }) => viewStore.updateBackground(hex)}
          />
        </div>
      </aside>
    );
  }
}

export default Properties;
