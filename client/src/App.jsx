import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { ChatContextProvider } from "./context/ChatContext";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  localStorage.setItem("darkMode", false);

  return (
    <ChatContextProvider user={user}>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/chat"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/chat" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/chat" /> : <Register />}
          />
          <Route path="*" element={<Navigate to="/chat" />} />
        </Routes>
      </Router>
    </ChatContextProvider>
  );
}

export default App;
