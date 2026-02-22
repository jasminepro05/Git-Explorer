import { Hero } from './Hero';
import { Features } from './Features';
import { Navbar } from './Navbar';
import { GitHubUser, GitHubRepo } from '../types';

interface LandingPageProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
  user: GitHubUser | null;
  repos: GitHubRepo[];
  error: string | null;
}

export const LandingPage = ({ onSearch, isLoading, user, repos, error }: LandingPageProps) => {
  return (
    <>
      <Navbar />
      <Hero 
        onSearch={onSearch} 
        isLoading={isLoading} 
        user={user} 
        repos={repos} 
        error={error} 
      />
      <Features />
    </>
  );
};
