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

  @action
  getData() {
    const savedList = JSON.parse(localStorage.getItem('Tripor-savedList'));
    if (savedList) {
      this.savedList = savedList;
      this.isSavedListModalOpen = true;
    } else this.isNewFrameModalOpen = true;
  }

  @action.bound
  resetValues() {
    this.projectName = projectDefaultName;
    layersStore.treeData = [];
    viewStore.resetValues();
  }

  @action.bound
  handleShortcutKeys({ code }) {
    if (this.isTyping) return;
    const shapeParent = toolsStore.tools.find(tool => tool.name === 'Shape');;
    switch (code) {
      case 'Space':
      case 'KeyH':
        toolsStore.setActiveTool('name', 'Hand');
        break;
      case 'KeyV':
        toolsStore.setActiveTool('name', 'Move');
        break;
      case 'KeyR':
        const rectangle = toolsStore.findChildTool('Shape', 'Rectangle');
        toolsStore.setActiveTool('name', 'Shape');
        toolsStore.setActiveChildTool(shapeParent.id, rectangle.id);
        break;
      case 'KeyC':
        const circle = toolsStore.findChildTool('Shape', 'Circle');
        toolsStore.setActiveTool('name', 'Shape');
        toolsStore.setActiveChildTool(shapeParent.id, circle.id);
        break;
      case 'KeyF':
        toolsStore.setActiveTool('name', 'Frame');
        break;
      case 'KeyT':
        toolsStore.setActiveTool('name', 'Text');
        break;
      case 'Backspace':
        layersStore.removeObject(viewStore.canvas.getActiveObject())
        viewStore.canvas.getActiveObject().remove();
        break;
    }
  }


  @action.bound
  applyData(item) {
    this.resetValues();
    this.isSavedListModalOpen = false;
    viewStore.canvas = new fabric.Canvas('canvas');
    viewStore.canvas.loadFromJSON(item.canvas, () => {
      viewStore.resizeCanvas(viewStore.canvas);
      viewStore.canvas.zoomToPoint(viewStore.centerPoint, item.latestZoom);
      viewStore.addCustomListeners();
      layersStore.treeData = item.treeData;
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
    this.isNewFrameModalOpen = false;
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
    const oldList = JSON.parse(localStorage.getItem('Tripor-savedList')) || [];
    const sameItem = oldList.find(item => item.id === viewStore.canvas.id);
    const data = {
      name: this.projectName,
      canvas: viewStore.canvas.toJSON([ 'id', 'triporIconType', 'triporType','triporName', 'parentFrame']),
      treeData: layersStore.treeData,
      id: viewStore.canvas.id,
      latestZoom: viewStore.canvas.getZoom(),
    };
    let newList = [...oldList, data];

    // check for duplicate
    if (sameItem) {
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
