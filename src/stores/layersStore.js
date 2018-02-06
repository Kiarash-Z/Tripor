import { observable, action } from 'mobx';
import uuid from 'uuid/v1';

import { viewStore } from './';

class LayersStore {
  @observable treeData = [];

  @action.bound
  updateTree(newTree) {
    this.treeData = newTree;
  }

  @action.bound
  toggleExpand(id) {
    this.treeData = this.treeData.map(item => {
      if (item.id === id) item.isExpanded = !item.isExpanded;
      return item;
    });
  }


  @action.bound
  addObject({ target }) {
    if (target.triporType === 'Frame') {
      this.treeData = [...this.treeData, {
        iconType: target.triporIconType,
        id: target.id,
        children: [],
        isExpanded: false,
        name: target.triporType
      }];
    } else {
      this.treeData = this.treeData.map(item => {
        if (item.id === target.parentFrame) {
          item.children.push({
            iconType: target.triporIconType,
            id: target.id,
            name: target.triporType
          });
          item.isExpanded = true;
        }
        return item;
      });
    }
  }

  @action.bound
  removeObject(target) {
    if (target.triporType === 'Frame') {
      this.treeData = this.treeData.filter(item => item.id !== target.id);
      viewStore.removeChildrenFor(target.id);
    } else {
      this.treeData = this.treeData.map(item => {
        if (item.id === target.parentFrame) {
          item.children = item.children.filter(child => child.id !== target.id);
        }
        return item;
      });
    }
  }

  @action.bound
  addBorder(id) {
    const activeObj = viewStore.canvas.getObjects().find(obj => obj.id === id);
    activeObj.set('stroke', '#60C1F9');
    activeObj.set('strokeWidth', 4);
    viewStore.canvas.renderAll();
  }

  @action.bound
  removeBorders() {
    viewStore.canvas.getObjects().forEach(obj => {
      obj.set('strokeWidth', 0);
    });
    viewStore.canvas.renderAll();
  }

  @action.bound
  handleClick(id) {
    const relatedObj = viewStore.canvas.getObjects().find(obj => obj.id === id);
    this.removeBorders();
    viewStore.canvas.setActiveObject(relatedObj);
  }

}


const layersStore = new LayersStore();

export { layersStore };
