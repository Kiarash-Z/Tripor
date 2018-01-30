import { observable, action } from 'mobx';

class LayersStore {
  @observable treeData = { module: 'Layers', isFirst: true, children: [] };

  @action.bound
  updateTree(newTree) {
    this.treeData = newTree;
  }
}


const layersStore = new LayersStore();

export { layersStore };
