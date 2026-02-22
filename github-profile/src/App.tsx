import { useEffect, useState } from 'react';
import { Github } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Background } from './components/Background';
import { SearchBar } from './components/SearchBar';
import { ProfileCard } from './components/ProfileCard';
import { RepoList } from './components/RepoList';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { useGitHubData } from './hooks/useGitHubData';
import { LandingPage } from './components/LandingPage';

export default function App() {
  const [initialUser, setInitialUser] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('lastGithubUser');
    if (savedUser) {
      setInitialUser(savedUser);
    }
  }, []);

  const { user, repos, loading, error, fetchData } = useGitHubData(initialUser);

  const handleSearch = (username: string) => {
    fetchData(username);
    // Smooth scroll to explorer section to show results
    const explorerSection = document.getElementById('explorer');
    if (explorerSection) {
      explorerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative selection:bg-indigo-500/30">
      <Background />
      
      {/* Landing Sections (Now includes search results) */}
      <LandingPage 
        onSearch={handleSearch} 
        isLoading={loading} 
        user={user} 
        repos={repos} 
        error={error} 
      />

      {/* Footer */}
      <footer className="py-12 text-center text-slate-600 text-sm border-t border-white/5">
        <p>© {new Date().getFullYear()} GitExplorer • Built with React & Tailwind CSS</p>
      </footer>
    </div>
  );
}
