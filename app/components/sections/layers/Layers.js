import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Tree from 'react-ui-tree';

@inject('layersStore')
@observer
class Layers extends Component {
  render() {
    const { layersStore } = this.props;
    const renderItem = item => {
      if (item.isFirst) {
        return (
          <div className="mb-4">
            <span className="font-small layers__title pb-2">{item.module}</span>
          </div>
        );
      }
      return (
        <div className="tree__item">
          <i className={`${item.iconType} p-1`} />
          <span className="font-tiny">{item.module}</span>
        </div>
      );
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
      </aside>
    );
  }
}

export default Layers;
