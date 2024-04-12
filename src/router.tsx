import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes, Outlet } from 'react-router-dom';

import { useAuth } from './contexts/AuthContext';
import SidebarLayout from './layouts/SidebarLayout';
import BaseLayout from './layouts/BaseLayout';

import SuspenseLoader from './components/SuspenseLoader';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Auth
const Login = Loader(lazy(() => import('@/pages/auth/login')));

// Main
const Dashboard = Loader(lazy(() => import('@/pages/Dashboard')));
const Messenger = Loader(lazy(() => import('@/pages/Messenger')));
const Blog = Loader(lazy(() => import('@/pages/Blog')));
const UserSettings = Loader(lazy(() => import('@/pages/Users/settings')));
const UserProfile = Loader(lazy(() => import('@/pages/Users/profile')));
const Survey = Loader(lazy(() => import('@/pages/Survey')));

// Components
const Buttons = Loader(lazy(() => import('@/pages/Components/Buttons')));
const Modals = Loader(lazy(() => import('@/pages/Components/Modals')));
const Accordions = Loader(lazy(() => import('@/pages/Components/Accordions')));
const Tabs = Loader(lazy(() => import('@/pages/Components/Tabs')));
const Badges = Loader(lazy(() => import('@/pages/Components/Badges')));
const Tooltips = Loader(lazy(() => import('@/pages/Components/Tooltips')));
const Avatars = Loader(lazy(() => import('@/pages/Components/Avatars')));
const Cards = Loader(lazy(() => import('@/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('@/pages/Components/Forms')));

// Status
const Status404 = Loader(lazy(() => import('@/pages/Status/Status404')));
const Status500 = Loader(lazy(() => import('@/pages/Status/Status500')));
const StatusComingSoon = Loader(
  lazy(() => import('@/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('@/pages/Status/Maintenance'))
);

const Router = () => {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route element={<PrivateRoutes />}>
          <Route path="" element={<SidebarLayout />}>
            <Route path="" element={<Navigate to={'dashboards'} replace />} />
            <Route path="dashboards" element={<Dashboard />} />
            <Route path="messenger" element={<Messenger />} />
            <Route path="blog" element={<Blog />} />
            <Route path="user" element={<UserSettings />} />
            <Route path="survey" element={<Survey />} />
            <Route path="profile">
              <Route path="" element={<Navigate to="details" replace />} />
              <Route path="details" element={<UserProfile />} />
            </Route>
            <Route path="components">
              <Route path="" element={<Navigate to="buttons" replace />} />
              <Route path="buttons" element={<Buttons />} />
              <Route path="modals" element={<Modals />} />
              <Route path="accordions" element={<Accordions />} />
              <Route path="tabs" element={<Tabs />} />
              <Route path="badges" element={<Badges />} />
              <Route path="tooltips" element={<Tooltips />} />
              <Route path="avatars" element={<Avatars />} />
              <Route path="cards" element={<Cards />} />
              <Route path="forms" element={<Forms />} />
            </Route>
          </Route>
        </Route>

        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="status">
          <Route path="" element={<Navigate to="404" replace />} />
          <Route path="404" element={<Status404 />} />
          <Route path="500" element={<Status500 />} />
          <Route path="maintenance" element={<StatusMaintenance />} />
          <Route path="coming-soon" element={<StatusComingSoon />} />
        </Route>
        <Route path="*" element={<Status404 />} />
      </Route>
    </Routes>
  );
};

const PrivateRoutes = () => {
  const { user } = useAuth();
  return user.isAuth ? <Outlet /> : <Navigate to="/login" />;
};

const AuthRoute = () => {
  const { user } = useAuth();
  return !user.isAuth ? <Outlet /> : <Navigate to="/dashboards" />;
};

export default Router;
