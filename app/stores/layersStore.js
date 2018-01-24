import { observable, action, computed } from 'mobx';
import uuid from 'uuid/v1';
import { predefinedDevices } from '../constants/layersConstants';

class LayersStore {
  @observable treeData = { module: 'Layers', isFirst: true, children: [] };
  @observable isNewFrameModalOpen = false;
  @observable predefinedDevices = JSON.parse(JSON.stringify(predefinedDevices));

  @action
  getLayers() {
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
    this.treeData = {
      ...this.treeData,
      children: [
        ...this.treeData.children, {
          width,
          height,
          module: 'Frame 1',
          leaf: true,
          iconType: 'tripor-frame',
        }, {
          width,
          height,
          module: 'Framed 1',
          leaf: true,
          iconType: 'tripor-frame',
        }],
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
