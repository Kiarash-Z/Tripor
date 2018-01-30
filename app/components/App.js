import React, { Component } from 'react';
import Modal from 'react-modal';
import { inject, observer } from 'mobx-react';

import ToolBar from './sections/toolbar/ToolBar';
import Layers from './sections/layers/Layers';
import Properties from './sections/properties/Properties';

const contentStyles = {
  top: '50%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  marginRight: '-50%',
  transform: 'translate(-50%, -50%)',
  position: 'absolute',
  border: '1px solid #ccc',
  background: '#fff',
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch',
  borderRadius: '4px',
  outline: 'none',
  padding: '30px',
};
Modal.setAppElement(document.body);
Modal.defaultStyles.content = contentStyles;

@inject('appStore', 'viewStore', 'toolsStore')
@observer
class App extends Component {
  componentDidMount() {
    const { viewStore, appStore } = this.props;
    window.addEventListener('keydown', appStore.handleShortcutKeys);
    window.addEventListener('resize', () => viewStore.resizeCanvas(viewStore.canvas));
  }
  render() {
    return (
      <div className="container">
        <ToolBar />
        <div className="sections-container">
          <Layers />
          <div id="canvas-wrapper" style={{ flex: 1 }} onMouseDown={this.props.toolsStore.handleMouseDown}>
            <canvas id="canvas" />
          </div>
          <Properties />
        </div>
      </div>
    );
  }
}

export default App;
