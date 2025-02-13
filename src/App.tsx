import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthProvider';
import Index from './pages/Index';
import ManageTeam from './pages/ManageTeam';
import ViewKudos from './pages/ViewKudos';
import MyKudos from './pages/MyKudos';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import CreateTeam from './pages/CreateTeam';
import Profile from './pages/Profile';
import TeamInvitation from './pages/TeamInvitation';
import { Toaster } from '@/components/ui/toaster';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';

const AppContent = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="/manage-team" element={<ManageTeam />} />
          <Route path="/view-kudos" element={<ViewKudos />} />
          <Route path="/my-kudos" element={<MyKudos />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-team" element={<CreateTeam />} />
          <Route path="/team-invitation" element={<TeamInvitation />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;