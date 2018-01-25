import { observable, action, computed } from 'mobx';

import { tools } from '../constants/drawConstants';

class DrawStore {
  @observable tools = JSON.parse(JSON.stringify(tools));
  @observable canvas = null;

  @action.bound
  setActiveTool(id) {
    this.tools = this.tools.map(tool => {
      tool.isSelected = tool.id === id;
      return tool;
    });
  }

  @action
  initializeCanvas() {
    const canvas = new fabric.Canvas('canvas');
    const { offsetWidth: layersWidth } = document.querySelector('.layers');
    const { offsetWidth: propertiesWidth } = document.querySelector('.properties');
    const width = document.body.offsetWidth - (layersWidth + propertiesWidth);
    const height = document.body.offsetHeight;

    canvas.setHeight(height);
    canvas.setWidth(width);
    this.canvas = canvas;
  }

  @action
  setZoom(frameWidth, frameHeight) {
    const { width, height } = this.canvas;
    const zoomLevel = (width * height) / (frameWidth * frameHeight) / 2;

    // /2 is for center
    this.canvas.zoomToPoint(new fabric.Point(width / 2, height / 2), zoomLevel);
  }

  @action.bound
  initializeFrame({ width, height }) {
    this.initializeCanvas();
    const frame = new fabric.Rect({
      width,
      height,
      left: 330,
      top: 560,
      fill: 'white',
    });
    this.setZoom(width, height);
    this.canvas.add(frame);
    this.canvas.forEachObject(obj => {
      obj.center();
    });
  }

  @computed get
  zoomPercentage() {
    if (!this.canvas) return '100%';
    return `${(this.canvas.getZoom() * 100).toFixed(2)}%`;
  }
}

const drawStore = new DrawStore;

export { drawStore };
