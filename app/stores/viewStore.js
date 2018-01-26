import { observable, action, computed } from 'mobx';

import { drawStore } from './';
import { tools } from '../constants/drawConstants';

class ViewStore {
  @observable projectName = 'Untitled';
  @observable isInfoModalOpen = false;
  @observable tools = JSON.parse(JSON.stringify(tools));

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
    else if (code === 'Backspace') drawStore.canvas.getActiveObject().remove();
  }

  @action.bound
  setActiveTool(id) {
    this.tools = this.tools.map(tool => {
      tool.isSelected = tool.id === id;
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
