import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import LayersTree from './LayersTree';

@inject('layersStore')
@observer
class Layers extends Component {
  render() {
    const { layersStore } = this.props;
    return (
      <aside className="layers">
        <h1 className="font-small layers__title pb-2 mb-4">Layers</h1>
        <LayersTree
          treeData={layersStore.treeData}
          toggleExpand={layersStore.toggleExpand}
          onMouseEnter={layersStore.addBorder}
          onMouseLeave={layersStore.removeBorders}
          onClick={layersStore.handleClick}
        />
      </aside>
    );
  }
}

export default Layers;
