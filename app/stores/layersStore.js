import { observable, action, computed } from 'mobx';

class LayersStore {
  @observable layers = {};
  @observable isNewFrameModalOpen = false;
  getLayers() {
    if (!Object.keys(this.layers).length) this.isNewFrameModalOpen = true;
  }
}

const layersStore = new LayersStore();
export { layersStore };
