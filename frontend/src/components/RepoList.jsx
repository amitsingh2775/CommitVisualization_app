import React, { useState, useEffect } from 'react';
import { getRepos } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/atoms/userState';

const RepoList = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    const fetchRepos = async () => {
      if (!user) {
        navigate('/login');
        return;
      }
      try {
        const repos = await getRepos();
        setRepos(repos);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching repositories:", error);
        setLoading(false);
      }
    };
    fetchRepos();
  }, [user, navigate]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'} transition-colors duration-300`}>
      {/* Header */}
      <header className="flex justify-between items-center mb-8 p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          {user && (
            <>
              <img
                src={user.avatar_url}
                alt={`${user.displayName}'s avatar`}
                className="w-14 h-14 rounded-full border-2 border-purple-500"
              />
              <div>
                <h1 className="text-3xl font-semibold">{user.displayName}'s Repositories</h1>
                <p className="text-gray-400">Explore your GitHub repositories</p>
              </div>
            </>
          )}
        </div>
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`flex items-center px-4 py-2 rounded-lg transition 
            ${darkMode ? 'bg-purple-600 text-white hover:bg-purple-500' : 'bg-black text-white hover:bg-gray-800'}`}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      {/* Repo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
        {repos.length > 0 ? (
          repos.map((repo) => (
            <div
              key={repo.id}
              className={`p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300
                ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
            >
              {/* Repo Name */}
              <h3
                className={`text-xl font-semibold mb-2 
                  ${darkMode ? 'text-purple-400' : 'text-black'}`}
              >
                {repo.name}
              </h3>
              
              {/* Flex container to align description and button at the bottom */}
              <div className="flex flex-col justify-between h-full">
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                  {repo.description || 'No description available.'}
                </p>

                {/* View Commits Button at the Bottom */}
                <Link
                  to={`/repos/${repo.owner.login}/${repo.name}/commits`}
                  className={`block text-center py-2 rounded-md font-semibold mt-auto
                    ${darkMode ? 'bg-purple-600 text-white' : 'bg-black text-white'} 
                    hover:bg-gray-900 transition`}
                >
                  View Commits
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full">
            <p className="text-xl">No repositories found. Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepoList;
