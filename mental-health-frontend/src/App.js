// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Auth/LoginScreen';
import SignUp from './pages/Auth/SignupScreen';
import Options from './pages/OptionsScreen';
import Chat from './pages/Chat/ChatBotScreen';
import DashboardScreen from './pages/DashBoardScreen';
import Welcome from './pages/screens/WelcomeScreen';
import Exercise from './pages/screens/ExerciseTipsScreen';
import Mood from './pages/screens/MoodScreen';
import Food from './pages/screens/FoodScreen';
import Music from './pages/screens/MusicPlayerScreen';
import Question from './pages/screens/QuestionScreen';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/options" element={<Options />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboardscreen" element={<DashboardScreen />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Welcome/>} />
          <Route path="/exercise" element={<Exercise/>} />
          <Route path="/mood" element={<Mood/>} />
          <Route path="/food" element={<Food/>} />
          <Route path="/musicplayer" element={<Music/>} />
          <Route path="/questions" element={<Question/>} />

    
          <Route path="/options" element={<Options />} />
          <Route path="/chat" element={<Chat />} />

          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;