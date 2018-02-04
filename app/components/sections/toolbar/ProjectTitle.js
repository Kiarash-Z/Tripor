import React from 'react';

import { Input } from '../../common';

const ProjectTitle = ({ projectName, onChange }) => (
  <div className="toolbar__title-container padded-item">
    <Input
      className="toolbar__title font-small"
      value={projectName}
      onChange={onChange}
      style={{ paddingBottom: 0 }}
      onClick={({ target }) => target.setSelectionRange(0, target.value.length)}
    />
    <i className="tripor-edit toolbar__title-icon" />
  </div>
);

export default ProjectTitle;
