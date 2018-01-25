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
        <div style={{ display: 'flex' }}>
          <a className="p-3 pointer toolbar__tool">
            <i className="tripor-menu" style={{ color: 'white' }} />
          </a>
          {renderTools()}
        </div>
        <h5 className="toolbar__title">Untitled</h5>
        <div className="toolbar__tool pointer font-small" style={{ color: 'white' }}>
          100%
        </div>
      </div>
    );
  }
}

export default ToolBar;
