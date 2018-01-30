import { observable, action, computed } from 'mobx';

import { propertiesStore } from './';
import { canvasDefaultBackground } from '../constants/drawConstants';

class ViewStore {
  @observable canvas = null;

  @action
  initializeCanvas() {
    const canvas = new fabric.Canvas('canvas', {
      preserveObjectStacking: true,
      backgroundColor: canvasDefaultBackground,
    });
    this.resizeCanvas(canvas);
  }

  @action.bound
  resizeCanvas(canvas) {
    const { offsetWidth: layersWidth } = document.querySelector('.layers');
    const { offsetWidth: propertiesWidth } = document.querySelector('.properties');
    const width = document.body.offsetWidth - (layersWidth + propertiesWidth);
    const height = document.body.offsetHeight;
    canvas.setHeight(height);
    canvas.setWidth(width);
    this.canvas = canvas;
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
    frame.isFrame = true;
    this.canvas.add(frame);
    this.canvas.forEachObject(obj => {
      obj.center();
      obj.setCoords();
      this.canvas.renderAll();
    });
  }

  @action
  toggleLockAllObjects(isLocked) {
    this.canvas.forEachObject(obj => {
      obj.hasControls = !isLocked;
      obj.lockMovementX = isLocked;
      obj.lockMovementY = isLocked;
      obj.setCoords();
    });
  }

  @action
  toggleFramesControls(bool) {
    this.canvas.forEachObject(obj => {
      if (obj.isFrame) {
        obj.hasControls = bool;
        obj.lockMovementX = !bool;
        obj.lockMovementY = !bool;
        obj.setCoords();
      }
    });
  }

  @action
  updateCanvas() {
    // bcuz canvas itself isn't observable
    const cloned = this.canvas;
    this.canvas = null;
    this.canvas = cloned;
  }


  @action
  evaluateObjectFrame(obj, { originX, originY }) {
    // const coords = obj.getCoords();
    // console.log('ob coords', obj.top);
    // const frames = viewStore.canvas.forEachObject(object => {
    //   if (object.isFrame) {

    //     console.log('frame cooords', object.getCoords());
    //     const xs = object.getCoords().map(coord => coord.x);
    //     const ys = object.getCoords().map(coord => coord.y);
    //     const maxX = Math.max(...xs);
    //     const minX = Math.min(...xs);
    //     const maxY = Math.max(...ys);
    //     const minY = Math.min(...ys);
    //     const isInside = (originX <= maxX) && (originX >= minX) && (originY <= maxY) && (originY >= minY);
    //     console.log(isInside);
    //   }
    // });
  }


  @action
  setZoom(frameWidth, frameHeight) {
    const { width, height } = this.canvas;
    let zoomLevel = (width / frameWidth) * (height / frameHeight) * 0.3;
    if (zoomLevel > 0.8) zoomLevel *= 0.5;
    if (zoomLevel < 0.3) zoomLevel *= 1.5;
    this.canvas.zoomToPoint(this.centerPoint, zoomLevel);
  }


  @action
  changeZoom(method) {
    const value = method === 'zoomIn' ? 0.1 : -0.1;
    let zoomLevel = (Number(this.zoomPercentage.slice(0, -1)) / 100) + value;
    if (zoomLevel <= 0.01) zoomLevel = 0.01;
    if (zoomLevel >= 5) zoomLevel = 5;
    this.canvas.zoomToPoint(this.centerPoint, zoomLevel);
    this.updateCanvas();
  }

  @action.bound
  addCustomListeners() {
    this.canvas.on('object:selected', propertiesStore.handleObjectSelect);
    this.canvas.on('object:moving', propertiesStore.updateObjectProperties);
    this.canvas.on('object:scaling', propertiesStore.updateObjectProperties);
    this.canvas.on('object:rotating', propertiesStore.updateObjectProperties);
    this.canvas.on('selection:cleared', propertiesStore.handleObjectsDeselect);
    // drawStore.canvas.on('object:added', layersStore)
  }

  @computed get
  zoomPercentage() {
    if (!this.canvas) return '100%';
    return `${(this.canvas.getZoom() * 100).toFixed(2)}%`;
  }

  @computed get
  centerPoint() {
    const { width, height } = this.canvas;
    return new fabric.Point(width / 2, height / 2);
  }

  @computed get
  activeObject() {
    return this.canvas.getActiveObject();
  }
}

const viewStore = new ViewStore();

export { viewStore };
