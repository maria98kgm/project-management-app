import { Routes, Route, Navigate } from 'react-router-dom';
import { App } from '../../App';
import { Paths } from '../../models';
import { Board } from '../../pages/Board';
import { Main } from '../../pages/Main';
import { SignIn } from '../../pages/SignIn';
import { SignUp } from '../../pages/SignUp';
import { Welcome } from '../../pages/Welcome';
import { NotFound } from '../../pages/NotFound';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={'/'} element={<App />}>
        <Route path={'/'} element={<Navigate to={Paths.WELCOME} />} />
        <Route path={Paths.WELCOME} element={<Welcome />} />
        <Route path={Paths.MAIN} element={<Main />} />
        <Route path={Paths.SIGNIN} element={<SignIn />} />
        <Route path={Paths.SIGNUP} element={<SignUp />} />
        <Route path={Paths.BOARD} element={<Board />} />
        <Route path={Paths.NOTFOUND} element={<NotFound />} />
      </Route>
    </Routes>
  );
};
