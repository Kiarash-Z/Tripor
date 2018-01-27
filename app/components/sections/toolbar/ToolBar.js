import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { Input } from '../../common';
import InfoModal from './InfoModal';

@inject('viewStore')
@observer
class ToolBar extends Component {
  render() {
    const { viewStore } = this.props;
    const renderTools = () => viewStore.tools.map(tool => (
      <a
        className={`${tool.isSelected ? 'active' : ' '} toolbar__tool pointer`}
        key={tool.id}
        onClick={() => viewStore.setActiveTool('id', tool.id)}
        style={tool.size ? { fontSize: tool.size } : { }}
      >
        <i className={tool.icon} style={{ color: 'white' }} />
      </a>
    ));

    return (
      <div className="toolbar">
        <div style={{ display: 'flex', gridColumn: 1 }}>
          <a
            className="p-3 pointer toolbar__tool"
            onClick={() => { viewStore.isInfoModalOpen = true; }}
          >
            <i className="tripor-information" style={{ color: 'white' }} />
          </a>
          {renderTools()}
        </div>
        <div className="toolbar__title-container padded-item">
          <Input
            className="toolbar__title font-small"
            value={viewStore.projectName}
            onChange={value => { viewStore.projectName = value; }}
            onClick={({ target }) => target.setSelectionRange(0, target.value.length)}
          />
          <i className="tripor-edit toolbar__title-icon" />
        </div>
        <div className="toolbar__percentage pr-4 pointer font-small">
          <i
            className="tripor-minus p-2 font-small"
            style={{ color: 'white' }}
            onClick={() => viewStore.changeZoom('zoomOut')}
          />
          <span style={{ color: 'white' }}>{viewStore.zoomPercentage}</span>
          <i
            className="tripor-plus p-2 font-small"
            style={{ color: 'white' }}
            onClick={() => viewStore.changeZoom('zoomIn')}
          />
        </div>
        <InfoModal
          isOpen={viewStore.isInfoModalOpen}
          close={() => { viewStore.isInfoModalOpen = false; }}
        />
      </div>
    );
  }
}

export default ToolBar;
