import React from 'react';

import { ThemeProvider } from 'styled-components';

import GlobalStyle from './styles/global';
import dark from './styles/themes/dark';

import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SdkProvider } from '@klever/sdk';

const App: React.FC = () => (
  <ThemeProvider theme={dark}>
    <SdkProvider>
      <ToastContainer autoClose={2000} position="top-right" />
      <GlobalStyle />
      <Routes />
    </SdkProvider>
  </ThemeProvider>
);

export default App;
