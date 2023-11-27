import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogInPage from "./pages/login/loginPage";
import MoviesPage from "./pages/movies/movies";
import DirectorsPage from "./pages/directors/directors";
import ActorsPage from "./pages/actors/actors";
import AccountPage from "./pages/account/account";
import MovieDetailPage from "./pages/movieDetailPage/movieDetailPage";
import ActorDetailPage from "./pages/actorDetailPage/actorDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogInPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/actors" element={<ActorsPage />} />
        <Route path="/directors" element={<DirectorsPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/actor/:actorId" element={<ActorDetailPage />} />
      </Routes>

      <div className="App"></div>
    </Router>
  );
}

export default App;
