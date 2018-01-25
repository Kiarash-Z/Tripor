import { observable, action, computed } from 'mobx';
import { tools } from '../constants/drawConstants';

class DrawStore {
  @observable tools = JSON.parse(JSON.stringify(tools));

  @action.bound
  setActiveTool(id) {
    this.tools = this.tools.map(tool => {
      tool.isSelected = tool.id === id;
      return tool;
    });
  }
}

const drawStore = new DrawStore;

export { drawStore };
