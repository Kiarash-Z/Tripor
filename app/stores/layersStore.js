import { observable, action, computed } from 'mobx';
import { predefinedDevices } from '../constants/layersConstants';

class LayersStore {
  @observable layers = { };
  @observable isNewFrameModalOpen = false;
  @observable predefinedDevices = JSON.parse(JSON.stringify(predefinedDevices));

  @action
  getLayers() {
    if (!Object.keys(this.layers).length) this.isNewFrameModalOpen = true;
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
