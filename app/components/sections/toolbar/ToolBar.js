import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('drawStore')
@observer
class ToolBar extends Component {
  render() {
    const { drawStore } = this.props;
    const renderTools = () => drawStore.tools.map(tool => (
      <a
        className={`${tool.isSelected ? 'active' : ' '} toolbar__tool pointer`}
        key={tool.id}
        onClick={() => drawStore.setActiveTool(tool.id)}
      >
        <i className={tool.icon} style={{ color: 'white' }} />
      </a>
    ));

    return (
      <div className="toolbar">
        <div style={{ display: 'flex', gridColumn: 1 }}>
          <a className="p-3 pointer toolbar__tool">
            <i className="tripor-menu" style={{ color: 'white' }} />
          </a>
          {renderTools()}
        </div>
        <h5 style={{ gridColumn: 2 }} className="toolbar__title padded-item">Untitled</h5>
        <div className="padded-item pointer font-small" style={{ gridColumn: 3, textAlign: 'right' }}>
          {drawStore.zoomPercentage}
        </div>
      </div>
    );
  }
}

export default ToolBar;
