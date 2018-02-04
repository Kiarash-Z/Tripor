import { observable, action } from 'mobx';

class LayersStore {
  @observable treeData = { module: 'Layers', isFirst: true, children: [] };

  @action.bound
  updateTree(newTree) {
    this.treeData = newTree;
  }

  @action.bound
  addObject({ target }) {
    const children = this.treeData.children.map(child => {
      if (child.module === target.parentFrame) {
        child.children = child.children.slice();
        child.children.push({ module: 'Rectangle', iconType: 'tripor-rectangle' });
      }
      return child;
    });
    const treeData = {
      ...this.treeData,
      children,
    };
    this.updateTree(treeData);
  }
}


const layersStore = new LayersStore();

export { layersStore };
