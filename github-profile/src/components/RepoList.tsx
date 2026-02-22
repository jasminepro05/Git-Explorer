import { useState, useMemo } from 'react';
import { GitHubRepo, SortOption } from '../types';
import { RepoCard } from './RepoCard';
import { Filter, ArrowUpDown, Search, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RepoListProps {
  repos: GitHubRepo[];
}

export const RepoList = ({ repos }: RepoListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('stars');

  const filteredAndSortedRepos = useMemo(() => {
    return repos
      .filter(repo => 
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .sort((a, b) => {
        if (sortBy === 'stars') {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }, [repos, searchTerm, sortBy]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-10">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          Repositories 
          <span className="px-3 py-1 bg-indigo-600/30 border border-indigo-500/30 rounded-full text-sm font-medium text-indigo-300">
            {filteredAndSortedRepos.length}
          </span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Filter repos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setSortBy('stars')}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                sortBy === 'stars' 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Star size={14} /> Stars
            </button>
            <button
              onClick={() => setSortBy('created')}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                sortBy === 'created' 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ArrowUpDown size={14} /> Newest
            </button>
          </div>
        </div>
      </div>

      {filteredAndSortedRepos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedRepos.map((repo, index) => (
              <RepoCard key={repo.id} repo={repo} index={index} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-3xl"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
            <Filter className="text-slate-500" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No repositories found</h3>
          <p className="text-slate-400">Try adjusting your search or filters.</p>
        </motion.div>
      )}
    </div>
  );
};
