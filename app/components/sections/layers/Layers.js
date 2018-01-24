import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import NewFrameModal from './NewFrameModal';

@inject('layersStore')
@observer
class Layers extends Component {
  componentDidMount() {
    this.props.layersStore.getLayers();
  }
  render() {
    const { layersStore } = this.props;
    return (
      <aside className="layers">
        <span>Layers</span>
        <NewFrameModal
          isOpen={layersStore.isNewFrameModalOpen}
          onCLose={() => { layersStore.isNewFrameModalOpen = false; }}
          devices={layersStore.predefinedDevices}
          onSelectDevice={layersStore.selectDevice}
          activeDevice={layersStore.activeDevice}
          changeDimensions={layersStore.changeDeviceDimensions}
          createFrame={layersStore.createFrame}
        />
      </aside>
    );
  }
}

export default Layers;
