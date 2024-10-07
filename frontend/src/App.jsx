import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import RepoList from './components/RepoList';
import CommitList from './components/CommitList';
import CommitDetails from './components/CommitDetails';
import CommitGraph from './components/CommitGraph';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/repos" element={<RepoList />} />
        <Route path="/repos/:owner/:repo/commits" element={<CommitList />} />
        <Route path="/repos/:owner/:repo/commits/:sha" element={<CommitDetails />} />
        <Route path="/repos/:owner/:repo/commits/:sha/graph" element={<CommitGraph />} />
      </Routes>
    </div>
  );
};

export default App;
