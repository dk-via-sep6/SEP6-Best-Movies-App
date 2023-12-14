import { AuthProvider } from "./context/authContext";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LogInPage from "./pages/login/loginPage";
import MoviesPage from "./pages/movies/movies";

import AccountPage from "./pages/account/account";
import MovieDetailPage from "./pages/movieDetailPage/movieDetailPage";
import Layout from "./pages/layout/layout";

import ProtectedRoute from "./utils/protectedRoute/protectedRoute";
import { Provider } from "react-redux";
import store from "./store";
import PeoplePage from "./pages/People/peoplePage";
import PersonDetailsPage from "./pages/PersonDetailsPage/PersonDetailsPage";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LogInPage />} />

            <Route path="/" element={<Navigate to="/movies" replace />} />

            <Route element={<Layout />}>
              <Route
                path="/movies"
                element={
                  <ProtectedRoute>
                    <MoviesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/people"
                element={
                  <ProtectedRoute>
                    <PeoplePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <AccountPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/movie/:id"
                element={
                  <ProtectedRoute>
                    <MovieDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/person/:personId"
                element={
                  <ProtectedRoute>
                    <PersonDetailsPage />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
