import { observable, action, computed } from 'mobx';

import { toolsStore, viewStore, layersStore } from './';
import { predefinedDevices } from '../constants/layersConstants';
import { projectDefaultName } from '../constants/drawConstants';

class AppStore {
  @observable projectName = projectDefaultName;
  @observable predefinedDevices = JSON.parse(JSON.stringify(predefinedDevices));
  @observable isNewFrameModalOpen = false;
  @observable isInfoModalOpen = false;
  @observable isTyping = false;

  @action.bound
  handleShortcutKeys({ code }) {
    if (this.isTyping) return;
    switch (code) {
      case 'Space':
      case 'KeyH':
        toolsStore.setActiveTool('name', 'hand');
        break;
      case 'KeyV':
        toolsStore.setActiveTool('name', 'move');
        break;
      case 'KeyR':
        toolsStore.setActiveTool('name', 'shape');
        break;
      case 'KeyF':
        toolsStore.setActiveTool('name', 'frame');
        break;
      case 'Backspace':
        viewStore.canvas.getActiveObject().remove();
        break;
    }
  }

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
    downloadURI(viewStore.canvas.toDataURL({ format: 'png' }), 'Tripor-UI');
    // window.open();
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
