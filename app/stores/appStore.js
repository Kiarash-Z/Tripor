import { observable, action, computed } from 'mobx';

import { toolsStore, viewStore, layersStore } from './';
import { predefinedDevices, projectDefaultName } from '../constants/appConstants';

class AppStore {
  @observable savedList = [];
  @observable projectName = projectDefaultName;
  @observable predefinedDevices = JSON.parse(JSON.stringify(predefinedDevices));
  @observable isTyping = false;
  @observable isNewFrameModalOpen = false;
  @observable isInfoModalOpen = false;
  @observable isSavedListModalOpen = false;

  @action.bound
  resetValues() {
    this.projectName = projectDefaultName;
    layersStore.treeData = { module: 'Layers', isFirst: true, children: [] };
    viewStore.resetValues();
  }
  @action.bound
  handleShortcutKeys({ code }) {
    console.log(this.isTyping)
    if (this.isTyping) return;
    switch (code) {
      case 'Space':
      case 'KeyH':
        toolsStore.setActiveTool('name', 'Hand');
        break;
      case 'KeyV':
        toolsStore.setActiveTool('name', 'Move');
        break;
      case 'KeyR':
        toolsStore.setActiveTool('name', 'Shape');
        break;
      case 'KeyF':
        toolsStore.setActiveTool('name', 'Frame');
        break;
      case 'KeyT':
        toolsStore.setActiveTool('name', 'Text');
        break;
      case 'Backspace':
        viewStore.canvas.getActiveObject().remove();
        break;
    }
  }

  @action
  getData() {
    const savedList = JSON.parse(localStorage.getItem('Tripor-savedList'));
    if (savedList) {
      this.savedList = savedList;
      this.isSavedListModalOpen = true;
    } else this.isNewFrameModalOpen = true;
  }

  @action.bound
  applyData(item) {
    this.resetValues();
    this.isSavedListModalOpen = false;
    viewStore.canvas = new fabric.Canvas('canvas');
    viewStore.canvas.loadFromJSON(item.canvas, () => {
      viewStore.resizeCanvas(viewStore.canvas);

      // Will change when zoom logic completes
      viewStore.setZoom(2000, 2000);
      viewStore.addCustomListeners();
      viewStore.canvas.id = item.id;
      viewStore.canvas.renderAll();
    });
  }

  @action.bound
  selectDevice(id) {
    this.predefinedDevices = this.predefinedDevices.map(device => {
      device.isSelected = device.id === id;
      return device;
    });
  }

  @action.bound
  changeDeviceDimensions(value, prop) {
    if (this.isCustomSelected) {
      this.predefinedDevices = this.predefinedDevices.map(device => {
        if (device.isCustom) {
          device[prop] = value;
        }
        return device;
      });
    }
  }

  @action.bound
  createFrame() {
    const { width, height } = this.activeDevice;
    const frame = {
      width: Number(width),
      height: Number(height),
      module: 'Frame',
      leaf: true,
      iconType: 'tripor-frame',
      children: [],
    };
    viewStore.initializeFrame(frame);
    viewStore.addCustomListeners();
    this.isNewFrameModalOpen = false;
    const treeData = {
      ...layersStore.treeData,
      children: [
        ...layersStore.treeData.children,
        frame,
      ],
    };
    layersStore.updateTree(treeData);
  }

  @action.bound
  exportToImage() {
    const downloadURI = (uri, name) => {
      const link = document.createElement('a');
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    downloadURI(viewStore.canvas.toDataURL({ format: 'png' }), this.projectName);
  }

  @action.bound
  saveToList() {
    console.log('called')
    const oldList = JSON.parse(localStorage.getItem('Tripor-savedList')) || [];
    const sameItem = oldList.find(item => item.id === viewStore.canvas.id);
    const data = {
      name: this.projectName,
      canvas: JSON.stringify(viewStore.canvas),
      layersTree: layersStore.treeData,
      id: viewStore.canvas.id,
    };
    let newList = [...oldList, data];

    // check for duplicate
    if (sameItem) {
      console.log('same item');
      newList = oldList.map(item => {
        if (item.id === viewStore.canvas.id) item = data;
        return item;
      });
    }
    localStorage.setItem('Tripor-savedList', JSON.stringify(newList));
    this.savedList = newList;
  }

  @computed get
  activeDevice() {
    return this.predefinedDevices.find(device => device.isSelected) || {};
  }

  @computed get
  isCustomSelected() {
    return this.activeDevice.isCustom;
  }
}

const appStore = new AppStore();

export { appStore };
