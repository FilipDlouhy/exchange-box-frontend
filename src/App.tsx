import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login";
import ExchangeBox from "./pages/ExchnageBox";
import generateUrl from "./contants/url";
import axios from "axios";

// Mock authentication check function
const isAuthenticated = async (): Promise<boolean> => {
  const url = generateUrl("auth/check-token");
  try {
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error checking token:", error);
    return false;
  }
};

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated().then((authenticated) => {
      if (!authenticated) {
        navigate("/");
      }
    });
  }, [navigate]);

  return <>{children}</>;
};

const RouterSetup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated().then((authenticated) => {
      console.log(authenticated);
      if (authenticated) {
        navigate("/exchange-box");
      } else {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <Routes>
      <Route
        path="/exchange-box"
        element={
          <ProtectedRoute>
            <ExchangeBox />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <RouterSetup />
    </Router>
  );
}

export default App;
