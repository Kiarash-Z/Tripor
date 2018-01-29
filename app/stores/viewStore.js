import { observable, action, computed } from 'mobx';

import { drawStore } from './';
import { tools, projectDefaultName, canvasDefaultBackground } from '../constants/drawConstants';

class ViewStore {
  @observable projectName = projectDefaultName;
  @observable isInfoModalOpen = false;
  @observable tools = JSON.parse(JSON.stringify(tools));
  @observable isTyping = false;
  @observable activeBackground = canvasDefaultBackground;
  @observable inputColorValue = canvasDefaultBackground;
  @observable isColorPickerOpen = false;
  @observable isCanvasSelected = true;
  @observable objectProperties = { left: '', top: '', width: '', height: '', angle: '' }

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
    let zoomLevel = (width / frameWidth) * (height / frameHeight) * 0.3;
    if (zoomLevel > 0.8) zoomLevel *= 0.5;
    if (zoomLevel < 0.3) zoomLevel *= 1.5;
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
  handleColorApply({ target, which }) {
    if (which !== 13) return;
    const { value } = target;
    const hexReg = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/;
    if (value.match(hexReg)) {
      this.updateBackground(value);
    }
  }

  @action.bound
  updateBackground(value) {
    this.activeBackground = value;
    this.inputColorValue = value;
    if (this.isCanvasSelected) this.updateCanvasBackground();
    else this.updateObjectBackground();
  }

  @action
  updateCanvasBackground() {
    drawStore.canvas.setBackgroundColor(
      this.activeBackground,
      drawStore.canvas.renderAll.bind(drawStore.canvas),
    );
  }

  @action
  updateObjectBackground() {
    this.activeObject.set('fill', this.activeBackground);
    drawStore.canvas.renderAll();
  }

  @action.bound
  addCustomListeners() {
    drawStore.canvas.on('object:selected', this.handleObjectSelect);
    drawStore.canvas.on('object:moving', this.updateObjectProperties);
    drawStore.canvas.on('object:scaling', this.updateObjectProperties);
    drawStore.canvas.on('object:rotating', this.updateObjectProperties);
    drawStore.canvas.on('selection:cleared', this.handleObjectsDeselect);
    // drawStore.canvas.on('object:added', layersStore)
  }

  @action.bound
  handleObjectSelect() {
    this.isCanvasSelected = false;
    const hexaDecimal = `#${new fabric.Color(this.activeObject.fill).toHex()}`;
    this.activeBackground = hexaDecimal;
    this.inputColorValue = hexaDecimal;
    this.updateObjectProperties();
  }

  @action.bound
  handleObjectsDeselect() {
    this.isCanvasSelected = true;
    this.activeBackground = drawStore.canvas.backgroundColor;
    this.inputColorValue = drawStore.canvas.backgroundColor;
  }

  @action.bound
  updateObjectProperty(prop, value) {
    const numbered = Number(value);
    this.objectProperties = { ...this.objectProperties, [prop]: numbered };
    drawStore.canvas.getActiveObject().set(prop, numbered);
    drawStore.canvas.renderAll();
  }

  @action.bound
  updateObjectProperties() {
    const { left, top, angle } = this.activeObject;
    this.objectProperties = {
      left,
      top,
      angle,
      width: this.activeObject.getWidth(),
      height: this.activeObject.getHeight(),
    };
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

  @computed get
  activeObject() {
    return drawStore.canvas.getActiveObject();
  }
}

const viewStore = new ViewStore();

export { viewStore };
