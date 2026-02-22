import { GitHubUser } from '../types';
import { Users, BookOpen, ExternalLink, MapPin, Link as LinkIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileCardProps {
  user: GitHubUser;
}

export const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative w-full max-w-4xl mx-auto mb-12"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 rounded-3xl blur-xl"></div>
      <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col md:flex-row gap-8 items-center md:items-start">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="relative group"
        >
          <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
          <img 
            src={user.avatar_url} 
            alt={user.login} 
            className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white/10 object-cover shadow-2xl"
          />
        </motion.div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight">
                {user.name || user.login}
              </h1>
              <p className="text-indigo-400 font-medium text-lg">@{user.login}</p>
            </div>
            <a 
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/10 backdrop-blur-sm"
            >
              View Profile <ExternalLink size={16} />
            </a>
          </div>

          <p className="text-slate-300 text-lg mb-8 max-w-2xl leading-relaxed">
            {user.bio || "This user hasn't added a bio yet."}
          </p>

          <div className="grid grid-cols-3 gap-4 md:gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400 mb-1">
                <Users size={18} className="text-indigo-400" />
                <span className="text-sm font-medium uppercase tracking-wider">Followers</span>
              </div>
              <p className="text-2xl font-bold text-white">{user.followers.toLocaleString()}</p>
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400 mb-1">
                <Users size={18} className="text-purple-400" />
                <span className="text-sm font-medium uppercase tracking-wider">Following</span>
              </div>
              <p className="text-2xl font-bold text-white">{user.following.toLocaleString()}</p>
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400 mb-1">
                <BookOpen size={18} className="text-emerald-400" />
                <span className="text-sm font-medium uppercase tracking-wider">Repos</span>
              </div>
              <p className="text-2xl font-bold text-white">{user.public_repos.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
