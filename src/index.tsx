import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Paths } from './models';
import { App } from './App';
import { Welcome } from './pages/Welcome';
import { Main } from './pages/Main';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Board } from './pages/Board';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <HashRouter>
    <Routes>
      <Route path={'/'} element={<App />}>
        <Route path={'/'} element={<Navigate to={Paths.WELCOME} />} />
        <Route path={Paths.WELCOME} element={<Welcome />} />
        <Route path={Paths.MAIN} element={<Main />} />
        <Route path={Paths.SIGNIN} element={<SignIn />} />
        <Route path={Paths.SIGNUP} element={<SignUp />} />
        <Route path={Paths.BOARD} element={<Board />} />
      </Route>
    </Routes>
  </HashRouter>
);
