import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthGuard } from './components/AuthGuard';

import Login               from './pages/Login';
import Welcome             from './pages/Welcome';
import Dashboard           from './pages/Dashboard';
import Levels              from './pages/Levels';
import Gameplay            from './pages/Gameplay';
import PhishingChallenge   from './pages/PhishingChallenge';
import PasswordChallenge   from './pages/PasswordChallenge';
import PrivacyChallenge    from './pages/PrivacyChallenge';
import BrowsingChallenge   from './pages/BrowsingChallenge';
import CyberbullyingChallenge from './pages/CyberbullyingChallenge';
import MiniGames           from './pages/MiniGames';
import Results             from './pages/Results';
import Achievements        from './pages/Achievements';
import Leaderboard         from './pages/Leaderboard';
import Settings            from './pages/Settings';
import Profile             from './pages/Profile';

function Protected({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/"      element={<Welcome />} />
        <Route path="/login" element={<Login />}   />

        {/* Protected */}
        <Route path="/dashboard"             element={<Protected><Dashboard /></Protected>} />
        <Route path="/levels"                element={<Protected><Levels /></Protected>} />
        <Route path="/gameplay/:levelId"     element={<Protected><Gameplay /></Protected>} />
        <Route path="/challenge/phishing"    element={<Protected><PhishingChallenge /></Protected>} />
        <Route path="/challenge/password"    element={<Protected><PasswordChallenge /></Protected>} />
        <Route path="/challenge/privacy"     element={<Protected><PrivacyChallenge /></Protected>} />
        <Route path="/challenge/browsing"    element={<Protected><BrowsingChallenge /></Protected>} />
        <Route path="/challenge/cyberbullying" element={<Protected><CyberbullyingChallenge /></Protected>} />
        <Route path="/mini-games"            element={<Protected><MiniGames /></Protected>} />
        <Route path="/results"               element={<Protected><Results /></Protected>} />
        <Route path="/achievements"          element={<Protected><Achievements /></Protected>} />
        <Route path="/leaderboard"           element={<Protected><Leaderboard /></Protected>} />
        <Route path="/settings"              element={<Protected><Settings /></Protected>} />
        <Route path="/profile"               element={<Protected><Profile /></Protected>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
