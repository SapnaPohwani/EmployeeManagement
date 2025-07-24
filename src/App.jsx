import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardEmployee.jsx";
import AdminDashboard from "./pages/DashboardAdmin.jsx";


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage/>}/>
      <Route path="/admin" element={<AdminDashboard/>}/>
    </Routes>
  </Router>
);

export default App;
