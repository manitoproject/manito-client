import { Navigate, Outlet } from 'react-router-dom';

import routes from '@/routes';
import { accessToken } from '@/utils/storage';

export default function AuthGuard() {
  if (localStorage.getItem(accessToken)) {
    return <Outlet />;
  } else {
    return <Navigate to={routes.landing} replace />;
  }
}
