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
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { setUser } from "./store/user-state/userSlice";

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
        return;
      }
    });
  }, [navigate]);

  return <>{children}</>;
};

const RouterSetup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    isAuthenticated().then(async (authenticated) => {
      if (authenticated) {
        const getUrl = generateUrl("auth/get-user-by-token");
        const response = await axios.get(getUrl, { withCredentials: true });

        const {
          name,
          email,
          id,
          telephone,
          longitude,
          latitude,
          address,
          imageUrl,
        } = response.data;

        dispatch(
          setUser({
            name,
            email,
            id,
            telephone,
            longitude,
            latitude,
            address,
            imageUrl,
          })
        );
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
