import { useState, useEffect, useCallback } from 'react';
import { GitHubUser, GitHubRepo } from '../types';
import { githubService } from '../services/githubService';

export const useGitHubData = (initialUsername: string) => {
  const [username, setUsername] = useState(initialUsername);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (searchUsername: string) => {
    if (!searchUsername) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const [userData, reposData] = await Promise.all([
        githubService.getUser(searchUsername),
        githubService.getRepos(searchUsername)
      ]);
      
      setUser(userData);
      setRepos(reposData);
      localStorage.setItem('lastGithubUser', searchUsername);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setUser(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialUsername) {
      fetchData(initialUsername);
    }
  }, [initialUsername, fetchData]);

  return { user, repos, loading, error, fetchData };
};
