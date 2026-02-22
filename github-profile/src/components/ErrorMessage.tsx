import { AlertCircle, RefreshCcw } from 'lucide-react';
import { motion } from 'motion/react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-lg mx-auto p-8 bg-red-500/10 border border-red-500/20 rounded-3xl backdrop-blur-xl text-center shadow-2xl"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mb-6">
        <AlertCircle className="text-red-400" size={32} />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">Oops! Something went wrong</h3>
      <p className="text-red-200/70 mb-8 leading-relaxed">
        {message}. Please check the username and try again.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-8 py-3 bg-red-500 hover:bg-red-400 text-white font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-red-500/20"
        >
          <RefreshCcw size={18} /> Try Again
        </button>
      )}
    </motion.div>
  );
};
