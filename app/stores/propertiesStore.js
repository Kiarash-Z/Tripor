import { observable, action } from 'mobx';

import { viewStore } from './';
import { canvasDefaultBackground } from '../constants/viewConstants';

class PropertiesStore {
  @observable activeBackground = canvasDefaultBackground;
  @observable inputColorValue = canvasDefaultBackground;
  @observable objectProperties = { left: 0, top: 0, width: 0, height: 0, angle: 0 }
  @observable isColorPickerOpen = false;
  @observable isCanvasSelected = true;

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
    viewStore.canvas.setBackgroundColor(
      this.activeBackground,
      viewStore.canvas.renderAll.bind(viewStore.canvas),
    );
  }

  @action
  updateObjectBackground() {
    viewStore.activeObject.set('fill', this.activeBackground);
    viewStore.canvas.renderAll();
  }

  @action.bound
  handleObjectSelect() {
    if (!viewStore.activeObject) return;
    this.isCanvasSelected = false;
    const hexaDecimal = `#${new fabric.Color(viewStore.activeObject.fill).toHex()}`;
    this.activeBackground = hexaDecimal;
    this.inputColorValue = hexaDecimal;
    viewStore.activeObject.bringToFront();
    this.updateObjectProperties();
  }

  @action.bound
  handleObjectsDeselect() {
    this.isCanvasSelected = true;
    this.activeBackground = viewStore.canvas.backgroundColor;
    this.inputColorValue = viewStore.canvas.backgroundColor;
  }

  @action.bound
  updateObjectProperty(prop, value) {
    const numbered = Number(value);
    this.objectProperties = { ...this.objectProperties, [prop]: numbered };
    viewStore.canvas.getActiveObject().set(prop, numbered);
    viewStore.canvas.renderAll();
  }

  @action.bound
  updateObjectProperties() {
    if (!viewStore.activeObject) return;
    const { left, top, angle } = viewStore.activeObject;
    this.objectProperties = {
      left,
      top,
      angle,
      width: viewStore.activeObject.getWidth() - 1,
      height: viewStore.activeObject.getHeight() - 1,
    };
  }
}

const propertiesStore = new PropertiesStore();

export { propertiesStore };
