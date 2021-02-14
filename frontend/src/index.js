import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
<<<<<<< HEAD
import { Provider } from "react-redux";
import rootReducer from './redux/reducers/rootReducer'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootReducer}>
      <App />
    </Provider>
  </React.StrictMode>,
=======
import {Provider} from 'react-redux'
import rootReducer from './redux/reducers/rootReducer'

ReactDOM.render(
  <Provider store={rootReducer}>
    <App />
  </Provider>,
>>>>>>> 32a42d230b0de776a9e0a69899b4d3bbcce11fd6
  document.getElementById('root')
);
