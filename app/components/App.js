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

@inject('viewStore')
@observer
class App extends Component {
  componentDidMount() {
    window.addEventListener('keypress', this.props.viewStore.handleShortcutKeys);
  }
  render() {
    return (
      <div className="container">
        <ToolBar />
        <div className="sections-container">
          <Layers />
          <div id="canvas-wrapper" style={{ flex: 1 }} onMouseDown={this.props.viewStore.handleMouseDown}>
            <canvas id="canvas" />
          </div>
          <Properties />
        </div>
      </div>
    );
  }
}

export default App;
