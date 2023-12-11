// App.tsx
import { AuthProvider } from "./context/authContext"; // Adjust the path as needed
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
import Layout from "./pages/layout/layout"; // Import the Layout component

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
          {/* Route for LogInPage without the Layout */}
          <Route path="/login" element={<LogInPage />} />

          {/* Wrap all other routes with the Layout */}
          <Route path="/" element={<Navigate to="/movies" replace />} />

          <Route element={<Layout />}>
            {/* Wrap each protected route with ProtectedRoute */}
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
                  <PersonDetailsPage/>
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
