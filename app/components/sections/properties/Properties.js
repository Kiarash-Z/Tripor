import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import ColorPicker from './ColorPicker';
import ObjectProperties from './ObjectProperties';

@inject('appStore', 'propertiesStore')
@observer
class Properties extends Component {
  render() {
    const { appStore, propertiesStore } = this.props;
    return (
      <aside className="properties">
        <h1 className="properties__title pb-2 font-small mb-4">Properties</h1>
        {!propertiesStore.isCanvasSelected ?
          <ObjectProperties
            properties={propertiesStore.objectProperties}
            updateProperty={propertiesStore.updateObjectProperty}
          /> :
          null
        }
        <div className="properties__section">
          <h2 style={{ fontWeight: 100 }} className="font-tiny">BACKGROUND</h2>
          <ColorPicker
            isOpen={propertiesStore.isColorPickerOpen}
            togglePicker={() => { propertiesStore.isColorPickerOpen = !propertiesStore.isColorPickerOpen; }}
            color={propertiesStore.activeBackground.toUpperCase()}
            inputColorValue={propertiesStore.inputColorValue.toUpperCase()}
            handleInputKeyDown={propertiesStore.handleColorApply}
            handleInputChange={value => { propertiesStore.inputColorValue = value.toUpperCase(); }}
            updateObjectColor={({ hex }) => propertiesStore.updateBackground(hex)}
          />
        </div>
      </aside>
    );
  }
}

export default Properties;
