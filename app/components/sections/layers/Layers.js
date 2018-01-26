import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Tree from 'react-ui-tree';

import NewFrameModal from './NewFrameModal';

@inject('layersStore', 'drawStore')
@observer
class Layers extends Component {
  componentDidMount() {
    this.props.layersStore.getLayers();
  }
  render() {
    const { layersStore, drawStore } = this.props;
    const renderItem = item => {
      if (item.isFirst) return (
        <div className="mb-4">
          <span className="font-small layers__title pb-2">{item.module}</span>
        </div>
      );
      return (
        <div className="tree__item">
          <i className={`${item.iconType} p-1`} />
          <span className="font-tiny">{item.module}</span>
        </div>
      )
    };
    return (
      <aside className="layers">
        <Tree
          tree={layersStore.treeData}
          onChange={layersStore.updateTree}
          className="font-small mt-5"
          renderNode={renderItem}
          paddingLeft={0}
        />
        <NewFrameModal
          isOpen={layersStore.isNewFrameModalOpen}
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
