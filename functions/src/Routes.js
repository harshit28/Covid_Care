import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Typography from '@/pages/Typography/Typography';
import Tables from '@/pages/Tables/Tables';
import Notifications from '@/pages/Notifications/Notifications';
import Icons from '@/pages/Icons/Icons';
import Maps from '@/pages/Maps/Maps';
import Charts from '@/pages/Charts/Charts';
import Dashboard from '@/pages/Visits/Visits';
import Login from '@/pages/Login/Login';
import ErrorPage from '@/pages/Error/Error';
import Register from '@/pages/Register'
import firebase from 'firebase'
import Upload from '@/pages/Upload'
import FAQ from '@/pages/faq'
import Prevention from '@/pages/Prevention'
import Aboutus from '@/pages/Aboutus'
import News from '@/pages/news'

Vue.use(Router)

let router = new Router({

  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },

    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },

    // {
    //   path: '/error',
    //   name: 'Error',
    //   component: ErrorPage,
    // },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'faq',
          name: 'faq',
          component: FAQ,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'news',
          name: 'news',
          component: News,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'prevention',
          name: 'prevention',
          component: Prevention,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'aboutus',
          name: 'aboutus',
          component: Aboutus,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'upload',
          name: 'upload',
          component: Upload,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'typography',
          name: 'Typography',
          component: Typography,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'tables',
          name: 'tables',
          component: Tables,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'notifications',
          name: 'Notifications',
          component: Notifications,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'components/icons',
          name: 'Icons',
          component: Icons,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'components/maps',
          name: 'Maps',
          component: Maps,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'components/charts',
          name: 'Charts',
          component: Charts,
          meta: {
            requiresAuth: true
          }
        },
      ],
    },
    // {
    //   path: '*',
    //   name: 'Error',
    //   component: ErrorPage,
    // }
  ],
});

router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});
export default router;
