import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileSetupScreen from './screens/ProfileSetupScreen';
import VirtualTryOnScreen from './screens/VirtualTryOnScreen';
import AIStyleScreen from './screens/AIStyleScreen';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/profile-setup" element={<ProfileSetupScreen />} />
            <Route path="/" element={
              <ProtectedRoute>
                <HomeScreen />
              </ProtectedRoute>
            } />
            <Route path="/virtual-tryon" element={
              <ProtectedRoute>
                <VirtualTryOnScreen />
              </ProtectedRoute>
            } />
            <Route path="/ai-style" element={
              <ProtectedRoute>
                <AIStyleScreen />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;