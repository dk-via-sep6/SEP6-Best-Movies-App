import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogInPage from "./pages/login";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LogInPage />} />
        </Routes>
      </div>
      <div className="App"></div>
    </Router>
  );
}

export default App;
