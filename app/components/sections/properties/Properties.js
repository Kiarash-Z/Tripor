import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('layersStore')
@observer
class Properties extends Component {
  render() {
    return (
      <aside className="properties">
        <h1 className="properties__title pb-2 font-small">Properties</h1>
      </aside>
    );
  }
}

export default Properties;
