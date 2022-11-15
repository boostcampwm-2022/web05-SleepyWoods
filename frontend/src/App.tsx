import { BrowserRouter } from 'react-router-dom';
import { Global } from '@emotion/react';
import { global } from './global';
import Router from './Router';

function App() {
  return (
    <>
      <Global styles={global} />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
