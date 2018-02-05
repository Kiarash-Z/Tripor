import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';

import App from '../components/App';
import * as stores from '../stores';

const Root = () => {
  return (
    <Provider {...stores}>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </Provider>
  );
};

export default Root;

