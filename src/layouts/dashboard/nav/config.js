// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'contacts',
    path: '/contacts',
    icon: icon('ic_user'),
  },
  {
    title: 'Calendar',
    path: '/calendar',
    icon: icon('ic_calendar'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
  {
    title: 'Call Now',
    path: '/call',
    icon: icon('ic_callnow'),
  },

];

export default navConfig;
