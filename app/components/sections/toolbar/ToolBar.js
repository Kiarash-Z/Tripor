import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { Input } from '../../common';

@inject('appStore', 'toolsStore', 'viewStore')
@observer
class ToolBar extends Component {
  render() {
    const { appStore, toolsStore, viewStore } = this.props;
    const renderTools = () => toolsStore.tools.map(tool => (
      <a
        data-balloon={`${tool.name} Tool`}
        data-balloon-pos="down"
        className={`${tool.isSelected ? 'active' : ' '} toolbar__tool pointer`}
        key={tool.id}
        onClick={() => toolsStore.setActiveTool('id', tool.id)}
        style={tool.size ? { fontSize: tool.size } : { }}
      >
        <i className={tool.icon} style={{ color: 'white' }} />
      </a>
    ));

    return (
      <div className="toolbar">
        <div style={{ display: 'flex', gridColumn: 1 }}>
          <a
            data-balloon="Help"
            data-balloon-pos="down"
            className="p-3 pointer toolbar__tool"
            onClick={() => { appStore.isInfoModalOpen = true; }}
          >
            <i className="tripor-information" style={{ color: 'white' }} />
          </a>
          {renderTools()}
        </div>
        <div className="toolbar__title-container padded-item">
          <Input
            className="toolbar__title font-small"
            value={appStore.projectName}
            onChange={value => { appStore.projectName = value; }}
            onClick={({ target }) => target.setSelectionRange(0, target.value.length)}
          />
          <i className="tripor-edit toolbar__title-icon" />
        </div>
        <div className="toolbar__right-action">
          <div className="mr-3 pointer font-small">
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
          <a
            onClick={appStore.exportToImage}
            className="p-3 pointer toolbar__tool"
            data-balloon="Export to PNG"
            data-balloon-pos="down"
          >
            <i className="tripor-export" style={{ color: 'white' }} />
          </a>
          <a
            data-balloon="Save"
            data-balloon-pos="down"
            onClick={appStore.saveToList}
            className="p-3 pointer toolbar__tool"
          >
            <i className="tripor-save" style={{ color: 'white' }} />
          </a>
          <a
            data-balloon="Open..."
            data-balloon-pos="down"
            onClick={() => { appStore.isSavedListModalOpen = true; }}
            className="p-3 pointer toolbar__tool mr-2"
          >
            <i className="tripor-list" style={{ color: 'white' }} />
          </a>
        </div>
      </div>
    );
  }
}

export default ToolBar;
