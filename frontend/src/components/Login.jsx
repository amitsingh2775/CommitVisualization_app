// components/Login.jsx
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userState } from '../recoil/atoms/userState';
import { getCurrentUser, login } from '../services/api';

const Login = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser({
          isLogin: true,
          userEmail: currentUser.email,
          token: currentUser.token,
          displayName: currentUser.name,
          avatar_url: currentUser.avatar_url,
        });
        navigate('/repos'); // Redirect to the repos page
      }
    };

    fetchUser();
  }, [setUser, navigate]);

  if (user && user.isLogin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome back, {user.displayName}</h1>
          <p className="mb-2">You are logged in!</p>
          <a href="/repos" className="text-blue-400 hover:underline">View Repositories</a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-10 w-96">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Sign in to GitHub</h2>
        <button
          onClick={login}
          className="w-full flex items-center justify-center bg-purple-600 text-white font-semibold py-3 rounded-lg transition duration-200 hover:bg-purple-500"
        >
          <svg
            className="h-5 w-5 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M12 2c-5.522 0-10 4.478-10 10 0 4.418 2.867 8.165 6.839 9.485.5.092.682-.217.682-.483 0-.237-.008-.865-.013-1.698-2.777.6-3.37-1.34-3.37-1.34-.454-1.155-1.107-1.46-1.107-1.46-.905-.617.068-.606.068-.606 1.003.071 1.527 1.028 1.527 1.028.891 1.525 2.338 1.084 2.91.829.091-.645.35-1.084.635-1.33-2.222-.251-4.556-1.111-4.556-4.944 0-1.091.389-1.988 1.029-2.692-.103-.252-.446-1.278.096-2.664 0 0 .84-.269 2.748 1.026a9.531 9.531 0 0 1 2.5-.335 9.507 9.507 0 0 1 2.5.335c1.907-1.295 2.748-1.026 2.748-1.026.543 1.386.199 2.412.097 2.664.64.704 1.029 1.601 1.029 2.692 0 3.839-2.337 4.688-4.56 4.939.36.309.678.916.678 1.843 0 1.329-.012 2.404-.012 2.726 0 .266.181.579.684.482C21.134 20.164 24 16.418 24 12c0-5.522-4.478-10-10-10z" />
          </svg>
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
};

export default Login;
