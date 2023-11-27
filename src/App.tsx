//App.tsx
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
    <Router>
      <Layout>
        <Routes>
        <Route path="/login" element={<LogInPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/actors" element={<ActorsPage />} />
        <Route path="/directors" element={<DirectorsPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/actor/:actorId" element={<ActorDetailPage />} />
        <Route path="/director/:directorId" element={<DirectorDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
