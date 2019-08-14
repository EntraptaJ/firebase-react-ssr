import { LoadableType } from './Loadable';

export interface AppRoute {
  /**
   * Route Path for Router Route Component
   */
  path: string;

  /**
   * The full path used for navigation, Links, etc...
   */
  to: string;

  /**
   * Public label for route
   */
  label: string;

  /**
   * Exact
   */
  exact?: boolean;

  children?: AppRoute[];

  Loadable?: LoadableType<any>;
}
