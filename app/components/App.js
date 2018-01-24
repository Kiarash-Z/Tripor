import React from 'react';
// import ToolBar from './sections/ToolBar';
import Layers from './sections/Layers';
// import Properties from './sections/Properties';

const App = () => {
  return (
    <div className="container">
      {/* <ToolBar /> */}
      <div className="sections-container">
        <Layers />
        {/* <Properties /> */}
      </div>

    </div>
  );
};

export default App;
