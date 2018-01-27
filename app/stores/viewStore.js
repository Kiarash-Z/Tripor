import { observable, action, computed } from 'mobx';

import { drawStore } from './';
import { tools, projectDefaultName, canvasDefaultBackground } from '../constants/drawConstants';

class ViewStore {
  @observable projectName = projectDefaultName;
  @observable isInfoModalOpen = false;
  @observable tools = JSON.parse(JSON.stringify(tools));
  @observable isTyping = false;
  @observable canvasBackground = canvasDefaultBackground;
  @observable isColorPickerOpen = false;

  @action.bound
  handleShortcutKeys({ code }) {
    if (this.isTyping) return;
    switch (code) {
      case 'Space':
      case 'KeyH':
        this.setActiveTool('name', 'hand');
        break;
      case 'KeyV':
        this.setActiveTool('name', 'move')
        break;
      case 'KeyR':
        this.setActiveTool('name', 'shape');
        break;
      case 'KeyF':
        this.setActiveTool('name', 'frame');
        break;
      case 'Backspace':
        drawStore.canvas.getActiveObject().remove();
        break;
    }
  }

  @action.bound
  setActiveTool(prop, value) {
    this.tools = this.tools.map(tool => {
      tool.isSelected = tool[prop] === value;
      return tool;
    });
  }

  @action.bound
  handleMouseDown(e) {
    switch (this.activeTool.name) {
      case 'hand':
        drawStore.toggleLockAllObjects(true);
        drawStore.startPan(e);
        break;
      case 'move':
        drawStore.toggleLockAllObjects(false);
        break;
      case 'frame':
        drawStore.toggleLockAllObjects(false);
        drawStore.drawRect(e, true);
        break;
      case 'shape':
        drawStore.toggleLockAllObjects(false);
        drawStore.drawRect(e);
        break;
    }
  }

  @action
  setZoom(frameWidth, frameHeight) {
    const { width, height } = drawStore.canvas;
    const zoomLevel = (width * height) / (frameWidth * frameHeight) / 2;
    drawStore.canvas.zoomToPoint(this.centerPoint, zoomLevel);
  }


  @action
  changeZoom(method) {
    const value = method === 'zoomIn' ? 0.1 : -0.1;
    let zoomLevel = (Number(this.zoomPercentage.slice(0, -1)) / 100) + value;
    if (zoomLevel <= 0.01) zoomLevel = 0.01;
    if (zoomLevel >= 5) zoomLevel = 5;
    drawStore.canvas.zoomToPoint(this.centerPoint, zoomLevel);
    drawStore.updateCanvas();
  }

  @action.bound
  handleInputChange({ target, which }) {
    if (which !== 13) return;
    const { value } = target;
    const hexReg = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/;
    if (value.match(hexReg)) {
      this.updateCanvasBackground(value);
    }
  }

  @action.bound
  updateCanvasBackground(value) {
    this.canvasBackground = value;
    drawStore.canvas.setBackgroundColor(
      this.canvasBackground,
      drawStore.canvas.renderAll.bind(drawStore.canvas),
    );
  }

  @computed get
  zoomPercentage() {
    if (!drawStore.canvas) return '100%';
    return `${(drawStore.canvas.getZoom() * 100).toFixed(2)}%`;
  }

  @computed get
  activeTool() {
    return this.tools.find(tool => tool.isSelected) || {};
  }

  @computed get
  centerPoint() {
    const { width, height } = drawStore.canvas;
    return new fabric.Point(width / 2, height / 2);
  }
}

const viewStore = new ViewStore();

export { viewStore };
