import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import AuthLayout from "./layouts/auth-layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { isAuthenticated } from "./services/auth.service";
import CreateThreadModal from "./components/create_thread_modal";
import Search from "./pages/search";
import Thread from "./pages/thread";

const PrivateRoute = ({ children }) =>
  isAuthenticated() ? children : <Navigate to="/login" replace />;

const PublicRoute = ({ children }) =>
  !isAuthenticated() ? children : <Navigate to="/" replace />;

export default function App() {
  const location = useLocation();
  const state = location.state;

  return (
    <>
      {/* ========= BACKGROUND ROUTES ========= */}
      <Routes location={state?.backgroundLocation || location}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/post/:id" element={<Thread />} />
        </Route>
      </Routes>

      {/* ========= MODAL OVERLAY ========= */}
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateThreadModal />
              </PrivateRoute>
            }
          />
        </Routes>
      )}
    </>
  );
}