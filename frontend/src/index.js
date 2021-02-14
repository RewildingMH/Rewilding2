import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import rootReducer from './redux/reducers/rootReducer'

ReactDOM.render(
  <Provider store={rootReducer}>
    <App />
  </Provider>,
  document.getElementById('root')
);
