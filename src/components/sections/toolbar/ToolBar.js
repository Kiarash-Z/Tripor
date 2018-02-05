import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import ProjectTitle from './ProjectTitle';
import DirectTools from './DirectTools';
import CanvasZoom from './CanvasZoom';
import ExportTools from './ExportTools';

@inject('appStore', 'toolsStore', 'viewStore')
@observer
class ToolBar extends Component {
  render() {
    const { appStore, toolsStore, viewStore } = this.props;

    return (
      <div className="toolbar">
        <DirectTools
          tools={toolsStore.tools}
          onClick={toolId => toolsStore.setActiveTool('id', toolId)}
          onChildToolClick={(parentId, childId) => toolsStore.setActiveChildTool(parentId, childId)}
          onModalToolClick={() => { appStore.isInfoModalOpen = true; }}
          toggleToolSelectors={id => toolsStore.toggleToolSelectors(id)}
        />
        <ProjectTitle
          projectName={appStore.projectName}
          onChange={value => { appStore.projectName = value; }}
        />
        <div className="toolbar__right-action">
          <CanvasZoom
            onZoomOut={() => viewStore.changeZoom('zoomOut')}
            onZoomIn={() => viewStore.changeZoom('zoomIn')}
            zoomPercentage={viewStore.zoomPercentage}
          />
          <ExportTools
            onExport={appStore.exportToImage}
            onSave={appStore.saveToList}
            openListModal={() => { appStore.isSavedListModalOpen = true; }}
          />
        </div>
      </div>
    );
  }
}

export default ToolBar;
