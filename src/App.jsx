import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import AuthLayout from "./layouts/auth-layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { isAuthenticated } from "./services/auth.service";

const PrivateRoute = ({ children }) =>
  isAuthenticated() ? children : <Navigate to="/login" replace />;

const PublicRoute = ({ children }) =>
  !isAuthenticated() ? children : <Navigate to="/" replace />;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH LAYOUT */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        </Route>

        {/* APP LAYOUT (PUBLIC PAGES) */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />

          {/* ONLY PRIVATE PAGE */}
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <div /> {/* dialog trigger route */}
              </PrivateRoute>
            }
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}