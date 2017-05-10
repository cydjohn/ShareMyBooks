import Base from './components/Base.jsx';
import HomePage from './containers/HomePage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import SingleBookPage from './components/SingleBookPage.jsx';
import MessageBoard from './containers/MessageBoard.jsx';
import PrivateMessage from './containers/PrivateMessagePage.jsx';
import PrivateMessageToAnyUserPage from './containers/PrivateMessageToAnyUserPage.jsx';
 import EditUserPage from './containers/EditUserPage.jsx';
// import EditUserPage from './components/EditUserPage.jsx';
import UploadBookPageContainer from './containers/UploadBookPageContainer.jsx';
import ViewReceivedRequests from './containers/ViewReceivedRequests.jsx';

import ViewSentRequests from './containers/ViewSentRequests.jsx';

import ViewPrivateMessages from './containers/ViewPrivateMessages.jsx';


//  import viewReceivedRequests from './containers/viewReceivedRequests.jsx';
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
      path: '/edituser',
       component: EditUserPage
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

    {
      path: '/user',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, DashboardPage);
        } else {
          callback(null, LoginPage);
        }
      }
    },
    {
      path: '/messageboard',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, MessageBoard);
        } else {
          callback(null, LoginPage);
        }
      }
    },
    {
      path: '/private_message/:bookUploadedBy',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, PrivateMessage);
        } else {
          callback(null, LoginPage);
        }
      }
    },
    {
      path: '/viewreceivedrequests',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, ViewReceivedRequests);
        } else {
          callback(null, LoginPage);
        }
      }
    },
    {

      path: '/viewsentrequests',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, ViewSentRequests);
          } else {
          callback(null, LoginPage);
        }
      }
    },
{

      path: '/view_private_messages',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, ViewPrivateMessages);
        } else {
          callback(null, LoginPage);
        }
      }
    },
    // {
    //   path: '/viewreceivedrequests',
    //   getComponent: (location, callback) => {
    //     if (Auth.isUserAuthenticated()) {
    //       callback(null, viewReceivedRequests);
    //     } else {
    //       callback(null, LoginPage);
    //     }
    //    }
    //  },

    {
      path: '/private_message_to_any_user',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, PrivateMessageToAnyUserPage);
        } else {
          callback(null, LoginPage);
        }
      }
    },


    // {
    //   path: '/edituser',
    //   component: EditUserPage
    // },

    {
      path: '/uploadbook',
      component: UploadBookPageContainer
    },

  ]
};

export default routes;
