import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { selectUserInfo } from '../../redux/features/userSlice';
import { ProtectedRoute } from '../ProtectedRoute';
import { App } from '../../App';
import { Paths } from '../../models';
import { Board } from '../../pages/Board';
import { Main } from '../../pages/Main';
import { SignIn } from '../../pages/SignIn';
import { SignUp } from '../../pages/SignUp';
import { Welcome } from '../../pages/Welcome';
import { NotFound } from '../../pages/NotFound';

export const AppRouter = () => {
  const userInfo = useAppSelector(selectUserInfo);

  return (
    <Routes>
      <Route path={'/'} element={<App />}>
        <Route path={'/'} element={<Navigate to={Paths.WELCOME} />} />
        <Route path={Paths.WELCOME} element={<Welcome />} />
        <Route element={<ProtectedRoute isAllowed={!userInfo} redirectPath={Paths.MAIN} />}>
          <Route path={Paths.SIGNIN} element={<SignIn />} />
          <Route path={Paths.SIGNUP} element={<SignUp />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!userInfo} redirectPath={Paths.WELCOME} />}>
          <Route path={Paths.MAIN} element={<Main />} />
          <Route path={Paths.BOARD} element={<Board />} />
        </Route>
        <Route path={Paths.NOT_FOUND} element={<NotFound />} />
      </Route>
    </Routes>
  );
};
