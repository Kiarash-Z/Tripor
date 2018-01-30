import { observable, action, computed } from 'mobx';

import { viewStore } from './';
import { tools, frameDefaultBackground, shapeDefaultBackground } from '../constants/drawConstants';

class ToolsStore {
  @observable tools = JSON.parse(JSON.stringify(tools));

  @action.bound
  handleMouseDown(e) {
    switch (this.activeTool.name) {
      case 'hand':
        viewStore.toggleLockAllObjects(true);
        this.startPan(e);
        break;
      case 'move':
        viewStore.toggleLockAllObjects(false);
        break;
      case 'frame':
        viewStore.toggleLockAllObjects(false);
        this.drawRect(e, true);
        break;
      case 'shape':
        viewStore.toggleLockAllObjects(false);
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
      viewStore.canvas.selection = false;
      viewStore.canvas.relativePan({
        x: (x - screenX) / 10,
        y: (y - screenY) / 10,
      });
    };
    const stopPan = () => {
      canvasWrapper.removeEventListener('mousemove', pan);
      viewStore.canvas.selection = true;
    };

    canvasWrapper.addEventListener('mousemove', pan);
    canvasWrapper.addEventListener('mouseup', stopPan);
  }

  @action
  drawRect(e, isFrame) {
    const activeGroup = viewStore.canvas.getActiveGroup();
    const activeObject = viewStore.canvas.getActiveObject();
    if (activeGroup || (activeObject ? activeObject.isFrame === isFrame : false)) return;
    if (!isFrame) viewStore.toggleFramesControls(false);
    viewStore.canvas.selection = false;
    const canvasWrapper = document.querySelector('#canvas-wrapper');
    const { x, y } = viewStore.canvas.getPointer(e);
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
    const parentFrame = isFrame ? false : viewStore.evaluateObjectFrame(rect, { originX, originY });
    rect.parentFrame = parentFrame;
    viewStore.canvas.add(rect);
    const handleMove = event => {
      const pointer = viewStore.canvas.getPointer(event);

      if (originX > pointer.x) {
        rect.set({ left: pointer.x });
      }
      if (originY > pointer.y) {
        rect.set({ top: pointer.y });
      }

      rect.set({ width: Math.abs(originX - pointer.x) });
      rect.set({ height: Math.abs(originY - pointer.y) });

      viewStore.canvas.renderAll();
    };

    const stopDraw = () => {
      canvasWrapper.removeEventListener('mousemove', handleMove);
      viewStore.canvas.selection = true;
      viewStore.toggleFramesControls(true);
    };

    canvasWrapper.addEventListener('mousemove', handleMove);
    canvasWrapper.addEventListener('mouseup', stopDraw);
  }

  @action.bound
  setActiveTool(prop, value) {
    this.tools = this.tools.map(tool => {
      tool.isSelected = tool[prop] === value;
      return tool;
    });
  }

  @computed get
  activeTool() {
    return this.tools.find(tool => tool.isSelected) || {};
  }
}

const toolsStore = new ToolsStore;

export { toolsStore };
