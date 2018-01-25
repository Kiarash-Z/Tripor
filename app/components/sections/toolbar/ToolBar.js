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
        <a className="p-3 pointer toolbar__tool">
          <i className="tripor-menu" style={{ color: 'white' }} />
        </a>
        {renderTools()}
      </div>
    );
  }
}

export default ToolBar;
