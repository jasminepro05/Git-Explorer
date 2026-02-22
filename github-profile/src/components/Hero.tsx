import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Github } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { ProfileCard } from './ProfileCard';
import { RepoList } from './RepoList';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { GitHubUser, GitHubRepo } from '../types';

interface HeroProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
  user: GitHubUser | null;
  repos: GitHubRepo[];
  error: string | null;
}

export const Hero = ({ onSearch, isLoading, user, repos, error }: HeroProps) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-32 pb-20">
      <motion.div 
        style={{ y: y1, opacity }}
        className="container mx-auto px-6 relative z-10 text-center mb-12"
      >
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 bg-white/5 border border-white/10 rounded-2xl mb-6 backdrop-blur-md shadow-xl">
            <Github className="text-white" size={40} />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight">
            Git<span className="text-indigo-500">Explorer</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Discover GitHub profiles and explore repositories with a modern, 
            interactive interface.
          </p>
        </motion.div>

        {/* Search Bar */}
        <SearchBar onSearch={onSearch} isLoading={isLoading} />
      </motion.div>

      {/* Results Section */}
      <div id="explorer" className="container mx-auto px-6 relative z-10 w-full max-w-6xl">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12"
            >
              <LoadingSpinner />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-12"
            >
              <ErrorMessage message={error} onRetry={() => onSearch('')} />
            </motion.div>
          ) : user ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              <ProfileCard user={user} />
              <RepoList repos={repos} />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 flex flex-col items-center justify-center gap-6"
            >
              <a
                href="#features"
                className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-bold transition-all backdrop-blur-xl"
              >
                Learn More
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: useTransform(scrollY, [0, 1000], [0, -300]) }}
        className="absolute top-1/4 left-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] -z-10"
      />
      <motion.div 
        style={{ y: useTransform(scrollY, [0, 1000], [0, 400]) }}
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -z-10"
      />
    </section>
  );
};
