/* eslint-disable react/no-array-index-key */
import React, { lazy, Suspense, Fragment } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import HomeView from 'src/views/pages/HomeView';
import LoadingScreen from 'src/components/LoadingScreen';
import AuthGuard from 'src/components/AuthGuard';
import GuestGuard from 'src/components/GuestGuard';

const routesConfig = [
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/login" />
  },
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('src/views/pages/Error404View'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    path: '/login-unprotected',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/register',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    exact: true,
    path: '/register-unprotected',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    path: '/app',
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/app',
        component: () => <Redirect to="/app/management/users" />
      },
      {
        exact: true,
        path: '/app/account',
        component: () => <Redirect to="/app/management/users" />
      },
      {
        exact: true,
        path: '/app/management/news-article/create',
        component: lazy(() =>
          import('src/views/management/News/NewsCreateView')
        )
      },
      {
        exact: true,
        path: '/app/management/news-articles',
        component: lazy(() =>
          import('src/views/management/News/NewsListView')
        )
      },
      {
        exact: true,
        path: '/app/management/picks/create',
        component: lazy(() =>
          import('src/views/management/Picks/PicksCreateView')
        )
      },
      {
        exact: true,
        path: '/app/management/picks',
        component: lazy(() =>
          import('src/views/management/Picks/PicksListView')
        )
      },
      {
        exact: true,
        path: '/app/management/podcasts/create',
        component: lazy(() =>
          import('src/views/management/Podcasts/PodcastsCreateView')
        )
      },
      {
        exact: true,
        path: '/app/management/podcasts',
        component: lazy(() =>
          import('src/views/management/Podcasts/PodcastsListView')
        )
      },
      {
        exact: true,
        path: '/app/management/users',
        component: lazy(() =>
          import('src/views/management/users/UsersListView')
        )
      },
    ]
  },
  {
    path: '*',
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: '/home',
        component: HomeView
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
];

const renderRoutes = routes =>
  routes ? (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {routes.map((route, i) => {
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component = route.component;

          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              render={props => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      renderRoutes(route.routes)
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  ) : null;

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
