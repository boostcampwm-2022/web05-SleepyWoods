import { BrowserRouter } from 'react-router-dom';
import { Global } from '@emotion/react';
import { global } from './global';
import Router from './Router';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <>
      <Global styles={global} />
      <RecoilRoot>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
