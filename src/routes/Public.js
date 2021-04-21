import Home from '../components/pages/Home';
import Login from '../components/pages/Login';
import SignUp from '../components/pages/SignUp';

export default [
  {
    path: '/',
    name: 'home',
    icon: null,
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    icon: null,
    component: Login,
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    icon: null,
    component: SignUp,
  },
];
