import React, { Fragment } from 'react';

const ExportTools = ({ onExport, onSave, openListModal }) => (
  <Fragment>
    <a
      onClick={onExport}
      className="p-3 pointer toolbar__tool"
      data-balloon="Export to PNG"
      data-balloon-pos="down"
    >
      <i className="tripor-export" style={{ color: 'white' }} />
    </a>
    <a
      data-balloon="Save"
      data-balloon-pos="down"
      onClick={onSave}
      className="p-3 pointer toolbar__tool"
    >
      <i className="tripor-save" style={{ color: 'white' }} />
    </a>
    <a
      data-balloon="Open..."
      data-balloon-pos="down"
      onClick={openListModal}
      className="p-3 pointer toolbar__tool mr-2"
    >
      <i className="tripor-list" style={{ color: 'white' }} />
    </a>
  </Fragment>
);

export default ExportTools;