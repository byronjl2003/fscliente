import React from 'react';
import logo from './logo.svg';
import './App.css';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import { Provider } from 'react-redux';

import { store } from './store/store';
import { AppRouter } from './routers/AppRouter';

function App() {


  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
