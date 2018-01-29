import { observable, action } from 'mobx';

import { viewStore } from './';
import { frameDefaultBackground, shapeDefaultBackground, canvasDefaultBackground } from '../constants/drawConstants';

class DrawStore {
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
    viewStore.setZoom(width, height);
    frame.isFrame = true;
    this.canvas.add(frame);
    this.canvas.forEachObject(obj => {
      obj.center();
      obj.setCoords();
    });
  }

  @action.bound
  startPan(e) {
    const canvasWrapper = document.querySelector('#canvas-wrapper');
    const { screenX, screenY } = e;

    const pan = event => {
      const { screenX: x, screenY: y } = event;
      this.canvas.selection = false;
      this.canvas.relativePan({
        x: (x - screenX) / 10,
        y: (y - screenY) / 10,
      });
    };
    const stopPan = () => {
      canvasWrapper.removeEventListener('mousemove', pan);
      this.canvas.selection = true;
    };

    canvasWrapper.addEventListener('mousemove', pan);
    canvasWrapper.addEventListener('mouseup', stopPan);
  }

  drawRect(e, isFrame) {
    const activeGroup = this.canvas.getActiveGroup();
    const activeObject = this.canvas.getActiveObject();
    if (activeGroup || (activeObject ? activeObject.isFrame === isFrame : false)) return;
    if (!isFrame) this.toggleFramesControls(false);
    const canvasWrapper = document.querySelector('#canvas-wrapper');
    const { x, y } = this.canvas.getPointer(e);
    const originX = x;
    const originY = y;
    const rect = new fabric.Rect({
      isFrame,
      left: originX,
      top: originY,
      width: 0,
      height: 0,
      fill: isFrame ? frameDefaultBackground : shapeDefaultBackground,
    });
    const parentFrame = isFrame ? false : this.evaluateObjectFrame(rect, { originX, originY });
    rect.parentFrame = parentFrame;
    this.canvas.add(rect);
    const handleMove = event => {
      const pointer = this.canvas.getPointer(event);

      if (originX > pointer.x) {
        rect.set({ left: pointer.x });
      }
      if (originY > pointer.y) {
        rect.set({ top: pointer.y });
      }

      rect.set({ width: Math.abs(originX - pointer.x) });
      rect.set({ height: Math.abs(originY - pointer.y) });

      this.canvas.renderAll();
    };

    const stopDraw = () => {
      canvasWrapper.removeEventListener('mousemove', handleMove);
      this.toggleFramesControls(true);
    };

    canvasWrapper.addEventListener('mousemove', handleMove);
    canvasWrapper.addEventListener('mouseup', stopDraw);
  }

  @action
  evaluateObjectFrame(obj, { originX, originY }) {
    // const coords = obj.getCoords();
    // console.log('ob coords', obj.top);
    // const frames = this.canvas.forEachObject(object => {
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

  @action toggleLockAllObjects(isLocked) {
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
}

const drawStore = new DrawStore();

export { drawStore };
