import React, { Component } from 'react';
import Modal from 'react-modal';
import { inject, observer } from 'mobx-react';

import ToolBar from './sections/toolbar/ToolBar';
import Layers from './sections/layers/Layers';
import Properties from './sections/properties/Properties';

// modals
import SavedListModal from './modals/SavedListModal';
import NewFrameModal from './modals/NewFrameModal';
import InfoModal from './modals/InfoModal';

const contentStyles = {
  top: '50%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  marginRight: '-50%',
  transform: 'translate(-50%, -50%)',
  position: 'absolute',
  border: '1px solid #ccc',
  background: '#fff',
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch',
  borderRadius: '4px',
  outline: 'none',
  padding: '30px',
};
Modal.setAppElement(document.body);
Modal.defaultStyles.content = contentStyles;

@inject('appStore', 'viewStore', 'toolsStore')
@observer
class App extends Component {
  componentDidMount() {
    const { viewStore, appStore } = this.props;
    appStore.getData();
    window.addEventListener('keydown', appStore.handleShortcutKeys);
    window.addEventListener('resize', () => viewStore.resizeCanvas(viewStore.canvas));
  }
  render() {
    const { appStore } = this.props;
    return (
      <div className="container">
        <ToolBar />
        <div className="sections-container">
          <Layers />
          <div id="canvas-wrapper" style={{ flex: 1 }} onMouseDown={this.props.toolsStore.handleMouseDown}>
            <canvas id="canvas" />
          </div>
          <Properties />
        </div>
        <SavedListModal
          isOpen={appStore.isSavedListModalOpen}
          list={appStore.savedList}
          handleItemClick={appStore.applyData}
          handleNewFrame={() => {
            appStore.isSavedListModalOpen = false;
            appStore.isNewFrameModalOpen = true;
          }}
        />
        <NewFrameModal
          isOpen={appStore.isNewFrameModalOpen}
          devices={appStore.predefinedDevices}
          onSelectDevice={appStore.selectDevice}
          activeDevice={appStore.activeDevice}
          changeDimensions={appStore.changeDeviceDimensions}
          createFrame={appStore.createFrame}
        />

        <InfoModal
          isOpen={appStore.isInfoModalOpen}
          close={() => { appStore.isInfoModalOpen = false; }}
        />
      </div>
    );
  }
}

export default App;
