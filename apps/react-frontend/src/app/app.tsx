// eslint-disable-next-line @typescript-eslint/no-unused-vars
import './app.module.scss';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './routes/home-page/home-page.component';
import { LoginPage } from './routes/login-page/login-page.component';
import { Navigation } from './routes/navigation/navigation';
import firebase from './utils/firebase/firebase';
import { setLoading, setUserData } from './store/user/user.action';
import { RootState } from './store';
import { Spinner } from './components/forms/spinner/spinner.component';
import ProtectedRoute from './components/auth/protected-route.component';
import { AppDispatch } from './store';
import PublicRoute from './components/auth/public-route.component';
import authService from './services/security/auth.service';
import { DashboardPage } from './routes/dashboard/dashboard.component';

export const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setLoading(true));

        authService
          .login()
          .then((user) => {
            dispatch(setUserData(user));
            dispatch(setLoading(false));
          })
          .catch(() => {
            dispatch(setLoading(false));
          });
      } else {
        dispatch(setLoading(false));
      }
    });

    return unsubscribe;
  }, [dispatch]);

  console.log('loading', loading);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigation publicResource={true} />}>
        <Route index element={<HomePage />}></Route>
      </Route>
      <Route path="/admin" element={<Navigation publicResource={false} />}>
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        ></Route>
      </Route>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      ></Route>
    </Routes>
  );
};

export default App;
