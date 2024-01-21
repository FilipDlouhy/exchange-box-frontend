import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ExchangeBox from "./pages/ExchnageBox";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/exchange-box" element={<ExchangeBox />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
