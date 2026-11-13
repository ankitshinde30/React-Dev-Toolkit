import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ isAuthenticated, redirectTo = '/login' }) {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }
  return <Outlet />;
}

// ---------- usage in App.jsx ----------
// <Route element={<ProtectedRoute isAuthenticated={Boolean(user)} />}>
//   <Route path="dashboard" element={<Dashboard />} />
// </Route>

// ---------- after a successful login ----------
// const navigate = useNavigate();
// const location = useLocation();
// const from = location.state?.from?.pathname ?? '/';
// navigate(from, { replace: true });
