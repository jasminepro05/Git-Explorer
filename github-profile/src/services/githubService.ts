import { GitHubUser, GitHubRepo, GitHubUserSuggestion } from '../types';

const BASE_URL = 'https://api.github.com';

export const githubService = {
  async getUser(username: string): Promise<GitHubUser> {
    const response = await fetch(`${BASE_URL}/users/${username}`);
    if (!response.ok) {
      if (response.status === 404) throw new Error('User not found');
      throw new Error('Failed to fetch user');
    }
    return response.json();
  },

  async getRepos(username: string): Promise<GitHubRepo[]> {
    const response = await fetch(`${BASE_URL}/users/${username}/repos?per_page=100`);
    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }
    return response.json();
  },

  async searchUsers(query: string, signal?: AbortSignal): Promise<GitHubUserSuggestion[]> {
    const response = await fetch(`${BASE_URL}/search/users?q=${query}&per_page=5`, { signal });
    if (!response.ok) {
      throw new Error('Failed to fetch suggestions');
    }
    const data = await response.json();
    return data.items;
  }
};
