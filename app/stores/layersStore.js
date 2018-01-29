import { observable, action, computed } from 'mobx';
import { drawStore, viewStore } from './';
import { predefinedDevices } from '../constants/layersConstants';

class LayersStore {
  @observable treeData = { module: 'Layers', isFirst: true, children: [] };
  @observable isNewFrameModalOpen = false;
  @observable predefinedDevices = JSON.parse(JSON.stringify(predefinedDevices));

  @action
  getLayers() {
    // condition will update
    if (true) this.isNewFrameModalOpen = true;
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
      width,
      height,
      module: 'Frame',
      leaf: true,
      iconType: 'tripor-frame',
    };
    drawStore.initializeFrame(frame);
    viewStore.addCustomListeners();
    this.treeData = {
      ...this.treeData,
      children: [
        ...this.treeData.children,
        frame,
      ],
    };
    this.isNewFrameModalOpen = false;
  }

  @action.bound
  updateTree(newTree) {
    this.treeData = newTree;
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


const layersStore = new LayersStore();

export { layersStore };
