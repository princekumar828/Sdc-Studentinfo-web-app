
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Signin from "./sigininsignup/Signin";
import MainPage from "./components/pages/MainPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  const renderProtectedRoute = (element) => {
    return user ? element : <Navigate to="/" />;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route
            path="/main/*"
            element={renderProtectedRoute(<MainPage />)}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
