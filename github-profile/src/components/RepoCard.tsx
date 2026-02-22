import React from 'react';
import { GitHubRepo } from '../types';
import { Star, GitFork, ExternalLink, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface RepoCardProps {
  repo: GitHubRepo;
  index: number;
}

export const RepoCard: React.FC<RepoCardProps> = ({ repo, index }) => {
  const formattedDate = new Date(repo.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative block"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-br from-indigo-500/30 to-purple-600/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
      <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col shadow-xl transition-all group-hover:bg-white/10 group-hover:border-white/20">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
            {repo.name}
          </h3>
          <div className="text-slate-400 group-hover:text-white transition-colors">
            <ExternalLink size={18} />
          </div>
        </div>

        <p className="text-slate-400 text-sm mb-6 line-clamp-2 flex-grow group-hover:text-slate-300 transition-colors">
          {repo.description || "No description provided."}
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-auto">
          {repo.language && (
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
              <span className="text-xs font-medium text-slate-300">{repo.language}</span>
            </div>
          )}
          
          <div className="flex items-center gap-1 text-slate-400">
            <Star size={14} className="text-yellow-500" />
            <span className="text-xs font-semibold">{repo.stargazers_count.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <GitFork size={14} className="text-blue-400" />
            <span className="text-xs font-semibold">{repo.forks_count.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-1 text-slate-500 ml-auto">
            <Calendar size={14} />
            <span className="text-[10px] uppercase tracking-wider font-bold">{formattedDate}</span>
          </div>
        </div>
      </div>
    </motion.a>
  );
};
