import { observable, action } from 'mobx';

import { viewStore } from './';

class DrawStore {
  @observable canvas = null;

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
    if (activeGroup) return;
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
      fill: isFrame ? 'white' : '#a29bfe',
    });
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
    };

    canvasWrapper.addEventListener('mousemove', handleMove);
    canvasWrapper.addEventListener('mouseup', stopDraw);
  }


  @action lockAllObjects() {
    this.canvas.forEachObject(obj => {
      obj.hasControls = false;
      obj.lockMovementX = true;
      obj.lockMovementY = true;
    });
  }

  @action releaseAllObjects() {
    this.canvas.forEachObject(obj => {
      obj.hasControls = true;
      obj.lockMovementX = false;
      obj.lockMovementY = false;
      obj.setCoords();
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
