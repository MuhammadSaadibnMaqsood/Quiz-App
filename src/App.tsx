import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HeroPage from "./pages/HeroPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Topics from "./pages/Topics";
import supabase from "../config/supabaseClient";
import Quiz from "./pages/Quiz";

interface User {
  id: string;
  email: string;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? "",
        });
      }
      setLoading(false);
    };

    initializeAuth();

    // 2. Listen for auth changes (Login, Logout, Signup)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? "",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []); // Added empty dependency array

  // Prevent flashing the HeroPage while checking auth
  if (loading) return null;

  return (
    <Routes>
      {/* If logged in, show Topics. If not, show HeroPage */}
      <Route path="/" element={user ? <Topics /> : <HeroPage />} />

      {/* Redirect logged-in users away from Login/Signup if they try to access them */}
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />

      {/* Example Protected Route */}
      <Route
        path="/topics"
        element={user ? <Topics /> : <Navigate to="/login" />}
      />
      <Route
        path="/quiz/:id"
        element={user ? <Quiz /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default App;
