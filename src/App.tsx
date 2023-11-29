// App.tsx
import { AuthProvider } from "./context/authContext"; // Adjust the path as needed
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogInPage from "./pages/login/loginPage";
import MoviesPage from "./pages/movies/movies";
import DirectorsPage from "./pages/directors/directors";
import ActorsPage from "./pages/actors/actors";
import AccountPage from "./pages/account/account";
import MovieDetailPage from "./pages/movieDetailPage/movieDetailPage";
import Layout from "./pages/layout/layout"; // Import the Layout component
import ActorDetailPage from "./pages/actorDetailPage/actorDetailPage";
import DirectorDetailPage from "./pages/directorDetailPage/directorDetailpage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route for LogInPage without the Layout */}
          <Route path="/login" element={<LogInPage />} />

          {/* Wrap all other routes with the Layout */}
          <Route element={<Layout />}>
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/actors" element={<ActorsPage />} />
            <Route path="/directors" element={<DirectorsPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/actor/:actorId" element={<ActorDetailPage />} />
            <Route
              path="/director/:directorId"
              element={<DirectorDetailPage />}
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
