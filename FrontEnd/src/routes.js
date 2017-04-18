import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
// import DashboardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import SingleBookPage from './components/SingleBookPage.jsx';
// import EditUserPage from './components/EditUserPage.jsx';
// import UploadBookPage from './components/UploadBookPage.jsx';
import Auth from './modules/Auth';


const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [

    {
      path: '/',
      component: HomePage
    //   getComponent: (location, callback) => {
    //     if (Auth.isUserAuthenticated()) {
    //       callback(null, DashboardPage);
    //     } else {
    //       callback(null, HomePage);
    //     }
    //   }
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();

        // change the current URL to /
        replace('/');
      }
    },

    {
      path: '/books/:id',
      component: SingleBookPage
    },

    // {
    //   path: '/user',
    //   getComponent: (location, callback) => {
    //     if (Auth.isUserAuthenticated()) {
    //       callback(null, DashboardPage);
    //     } else {
    //       callback(null, LoginPage);
    //     }
    //   }
    // },

    // {
    //   path: '/edituser',
    //   component: EditUserPage
    // },

    // {
    //   path: '/uploadbook',
    //   component: UploadBookPage
    // },

  ]
};

export default routes;
