import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Foods from "./pages/Foods";
import FoodTracker from "./pages/FoodTracker";
import AIFood from "./pages/AIFood";
import AIHistory from "./pages/AIHistory";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}

        />
        <Route path="/foods" element={<Foods />} />



        <Route path="/tracker" element={<FoodTracker />} />



        <Route path="/ai-food" element={<AIFood />} />
        <Route path="/ai-history" element={<AIHistory />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;