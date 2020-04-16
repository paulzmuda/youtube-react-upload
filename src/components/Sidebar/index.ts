import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon'
import DashboardIcon from '@material-ui/icons/Dashboard';
import VideosIcon from '@material-ui/icons/VideoLibrary';
import EventsIcon from '@material-ui/icons/Event';
import SettingsIcon from '@material-ui/icons/Settings';

export type MenuItem = {
  route: String
  icon: OverridableComponent<SvgIconTypeMap>
  name: String
  current: (myRoute: String, currentPath: String) => Boolean
}

// define navigation above the grey line
export const nav: MenuItem[] = [
{
    route: '/dashboard',
    icon: DashboardIcon,
    name: 'Dashboard',
    current: (myRoute, currentPath) => myRoute === currentPath,
  },
  {
    route: '/videos',
    icon: VideosIcon,
    name: 'Videos',
    current: (myRoute, currentPath) => myRoute === currentPath,
  },
  {
    route: '/events',
    icon: EventsIcon,
    name: 'Events',
    current: (myRoute, currentPath) => myRoute === currentPath,
  },
];

// define navigation below the grey line
export const subNav: MenuItem[] = [
  {
    route: '/settings',
    icon: SettingsIcon,
    name: 'Settings',
    current: (myRoute, currentPath) => myRoute === currentPath,
  },
];
