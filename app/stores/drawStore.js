import { observable, action, computed } from 'mobx';

import { tools } from '../constants/drawConstants';

class DrawStore {
  @observable tools = JSON.parse(JSON.stringify(tools));
  @observable canvas = null;
  @observable projectName = 'Untitled';
  @observable isInfoModalOpen = false;

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
    });
  }

  @action.bound
  handleMouseDown(e) {
    switch (this.activeTool.name) {
      case 'hand':
        this.lockAllObjects();
        this.startPan(e);
        break;
      case 'move':
        this.releaseAllObjects();
        break;
      case 'frame':
        this.releaseAllObjects();
        this.drawRect(e, true);
        break;
      case 'shape':
        this.releaseAllObjects();
        this.drawRect(e);
        break;
    }
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
  setZoom(frameWidth, frameHeight) {
    const { width, height } = this.canvas;
    const zoomLevel = (width * height) / (frameWidth * frameHeight) / 2;
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

  @action
  updateCanvas() {
    // bcuz canvas itself isn't observable
    const cloned = this.canvas;
    this.canvas = null;
    this.canvas = cloned;
  }

  @action.bound
  handleShortcutKeys({ code }) {
    const setActiveTool = name => {
      this.tools = this.tools.map(tool => {
        tool.isSelected = tool.name === name;
        return tool;
      });
    };

    if ((code === 'Space') || (code === 'KeyH')) setActiveTool('hand');
    else if (code === 'KeyV') setActiveTool('move');
    else if (code === 'KeyR') setActiveTool('shape');
    else if (code === 'KeyF') setActiveTool('frame');
  }

  @computed get
  centerPoint() {
    const { width, height } = this.canvas;
    return new fabric.Point(width / 2, height / 2);
  }

  @computed get
  zoomPercentage() {
    if (!this.canvas) return '100%';
    return `${(this.canvas.getZoom() * 100).toFixed(2)}%`;
  }

  @computed get
  activeTool() {
    return this.tools.find(tool => tool.isSelected) || {};
  }

}

const drawStore = new DrawStore;

export { drawStore };
