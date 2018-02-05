import { observable, action, computed } from 'mobx';
import uuid from 'uuid/v1';

import { viewStore } from './';
import { frameDefaultBackground, shapeDefaultBackground, textboxDefaultText } from '../constants/viewConstants';
import { tools } from '../constants/toolsConstants';

class ToolsStore {
  @observable tools = JSON.parse(JSON.stringify(tools));

  @action.bound
  handleMouseDown(e) {
    switch (this.activeTool.name) {
      case 'Hand':
        viewStore.toggleLockAllObjects(true);
        this.startPan(e);
        break;
      case 'Move':
        viewStore.toggleLockAllObjects(false);
        break;
      case 'Frame':
        viewStore.toggleLockAllObjects(false);
        this.drawRect(e, true);
        break;
      case 'Rectangle':
        viewStore.toggleLockAllObjects(false);
        this.drawRect(e);
        break;
      case 'Circle' :
        viewStore.toggleLockAllObjects(false);
        this.drawCircle(e)
        break;
      case 'Text':
        viewStore.toggleLockAllObjects(false);
        this.drawText(e);
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
    const canvasWrapper = document.querySelector('#canvas-wrapper');
    const activeGroup = viewStore.canvas.getActiveGroup();
    const activeObject = viewStore.canvas.getActiveObject();
    if (activeGroup || activeObject) return;
    if (!isFrame) viewStore.toggleFramesControls(false);
    viewStore.canvas.selection = false;
    const { x, y } = viewStore.canvas.getPointer(e);
    const originX = x;
    const originY = y;
    const rect = new fabric.Rect({
      left: originX,
      top: originY,
      width: 0,
      height: 0,
      triporType: isFrame ? 'Frame' : 'Rectangle',
      triporIconType: isFrame ? 'tripor-frame' : 'tripor-rectangle',
      fill: isFrame ? frameDefaultBackground : shapeDefaultBackground,
      id: uuid(),
    });
    const parentFrame = isFrame ? false : viewStore.evaluateObjectFrame(rect, { originX, originY });
    rect.parentFrame = parentFrame;
    viewStore.canvas.add(rect);

    const startDraw = event => this.handleDrawMove(event, { originX, originY }, rect);

    canvasWrapper.addEventListener('mousemove', startDraw);
    canvasWrapper.addEventListener('mouseup', () => this.stopDraw(startDraw));
  }

  @action
  drawCircle(e) {
    const canvasWrapper = document.querySelector('#canvas-wrapper');
    const activeGroup = viewStore.canvas.getActiveGroup();
    const activeObject = viewStore.canvas.getActiveObject();
    if (activeGroup || activeObject) return;
    viewStore.toggleFramesControls(false);
    viewStore.canvas.selection = false;
    const { x, y } = viewStore.canvas.getPointer(e);
    const originX = x;
    const originY = y;
    const circle = new fabric.Circle({
      left: originX,
      top: originY,
      width: 0,
      height: 0,
      radius: 1,
      triporType: 'Circle',
      triporIconType: 'tripor-circle',
      fill: shapeDefaultBackground,
      id: uuid(),
    });
    const parentFrame = viewStore.evaluateObjectFrame(circle, { originX, originY });
    circle.parentFrame = parentFrame;
    viewStore.canvas.add(circle);

    const startDraw = event => this.handleDrawMove(event, { originX, originY }, circle);

    canvasWrapper.addEventListener('mousemove', startDraw);
    canvasWrapper.addEventListener('mouseup', () => this.stopDraw(startDraw));
  }


  @action
  drawText(e) {
    const canvasWrapper = document.querySelector('#canvas-wrapper');
    const activeGroup = viewStore.canvas.getActiveGroup();
    const activeObject = viewStore.canvas.getActiveObject();
    if (activeGroup || activeObject) return;
    viewStore.canvas.selection = false;
    const { x, y } = viewStore.canvas.getPointer(e);
    const originX = x;
    const originY = y;
    const textbox = new fabric.Textbox(textboxDefaultText, {
      left: originX,
      top: originY,
      fontSize: 150,
      textAlign: 'center',
      fill: 'black',
      triporIconType: 'tripor-text',
      triporType : 'Textbox',
      id: uuid(),
    });
    const parentFrame = viewStore.evaluateObjectFrame(textbox, { originX, originY });
    textbox.parentFrame = parentFrame;
    viewStore.canvas.add(textbox);

    const startDraw = event => this.handleDrawMove(event, { originX, originY }, textbox);

    canvasWrapper.addEventListener('mousemove', startDraw);
    canvasWrapper.addEventListener('mouseup', () => this.stopDraw(startDraw));
  }

  @action
  handleDrawMove(event, { originX, originY }, object) {
    const { x, y } = viewStore.canvas.getPointer(event);
    if (originX > x) {
      object.set({ left: x });
    }
    if (originY > y) {
      object.set({ top: y });
    }
    object.set({ width: Math.abs(originX - x) });
    object.set({ height: Math.abs(originY - y) });
    object.set({ radius: Math.abs(x - originX) });

    viewStore.canvas.renderAll();
  }

  @action
  stopDraw(startFunc) {
    const canvasWrapper = document.querySelector('#canvas-wrapper');
    canvasWrapper.removeEventListener('mousemove', startFunc);
    viewStore.canvas.selection = true;
    viewStore.toggleFramesControls(true);
  }

  @action.bound
  setActiveTool(prop, value) {
    this.tools = this.tools.map(tool => {
      tool.isSelected = tool[prop] === value;
      return tool;
    });
  }
  @action.bound
  toggleToolSelectors(id) {
    this.tools = this.tools.map(tool => {
      if(tool.id === id) tool.isOpen = !tool.isOpen;
      return tool;
    })
  }

  @action.bound
  setActiveChildTool(parentId, childId) {
    this.tools = this.tools.map(tool => {
      if (tool.id === parentId) {
        tool.children = tool.children.map(child => {
          child.isSelected = child.id === childId;
          return child;
        });
      }
      return tool;
    })
  }

  @action
  closeAllToolsMenu() {
    this.tools = this.tools.map(tool => {
      tool.isOpen = false;
      return tool;
    });
  }

  @computed get
  activeTool() {
    const activeTool = this.tools.find(tool => tool.isSelected);
    if (activeTool.children) return activeTool.children.find(child => child.isSelected) || {};
    return activeTool || {};
  }

  @computed get
  findChildTool() {
    return (parentName, childName) => {
      const parent = this.tools.find(tool => tool.name === parentName);
      const child = parent.children.find(child => child.name === childName);
      return child;
    }
  }
}

const toolsStore = new ToolsStore;

export { toolsStore };
