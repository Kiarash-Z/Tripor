import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import ColorPicker from './ColorPicker';
import ObjectProperties from './ObjectProperties';
import TextProperties from './TextProperties';

@inject('appStore', 'propertiesStore', 'viewStore')
@observer
class Properties extends Component {
  render() {
    const { appStore, propertiesStore, viewStore } = this.props;
    const renderProperties = () => {
      if (!propertiesStore.isCanvasSelected) {
        return (
          <ObjectProperties
            properties={propertiesStore.objectProperties}
            updateProperty={propertiesStore.updateObjectProperty}
          />
        );
      }
    }
    const renderTextProperties = () => {
      if (viewStore.canvas && !propertiesStore.isCanvasSelected) {
        const activeObject = viewStore.activeObject;
        if (activeObject) {
            if (activeObject.triporType === 'textbox')
            return (
              <TextProperties
                alignments={propertiesStore.alignments}
                onChangeALignment={propertiesStore.handleALignmentChange}
                updateProperty={propertiesStore.updateObjectProperty}
                fontSize={activeObject.fontSize}
                lineHeight={activeObject.lineHeight}
              />
          )
        }
      }
    }
    return (
      <aside className="properties">
        <h1 className="properties__title pb-2 font-small mb-4">Properties</h1>
        {renderTextProperties()}
        {renderProperties()}
        <div className="properties__section">
          <h2 style={{ fontWeight: 100 }} className="font-tiny">FILL COLOR</h2>
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
