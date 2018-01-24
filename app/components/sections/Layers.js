import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('layersStore')
@observer
class Layers extends Component {
  componentDidMount() {
    this.props.layersStore.getLayers();
  }
  render() {
    return (
      <aside className="layers">
        <span>Layers</span>
      </aside>
    );
  }
}

export default Layers;
