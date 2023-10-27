import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogInPage from "./pages/login/login";
import MoviesPage from "./pages/movies/movies";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogInPage />} />
        <Route path="/movies" element={<MoviesPage />} />
      </Routes>

      <div className="App"></div>
    </Router>
  );
}

export default App;
