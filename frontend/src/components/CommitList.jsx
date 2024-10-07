import React, { useState, useEffect } from 'react';
import { getCommits } from '../services/api'; // Ensure this API call is correct
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs'; // For formatting the time
import relativeTime from 'dayjs/plugin/relativeTime';
import './CommitList.css'; // Add CSS file for animations

dayjs.extend(relativeTime);

const CommitList = () => {
  const { owner, repo } = useParams();
  const [commits, setCommits] = useState([]);
  const [totalCommits, setTotalCommits] = useState(0);
  const [lastCommitTime, setLastCommitTime] = useState('');

  // Function to fetch commits and update the state
  const fetchCommits = async () => {
    const data = await getCommits(owner, repo);
    setCommits(data);
    setTotalCommits(data.length);
    setLastCommitTime(dayjs(data[0]?.commit.author.date).fromNow());
  };

  useEffect(() => {
    // Fetch commits when the component loads
    fetchCommits();

    // Set up a real-time update every 15 seconds
    const interval = setInterval(() => {
      fetchCommits();
    }, 15000); // 15 seconds interval

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [owner, repo]);

  // Grouping commits by date
  const groupedCommits = commits.reduce((acc, commit) => {
    const date = dayjs(commit.commit.author.date).format('MMM D, YYYY');
    if (!acc[date]) acc[date] = [];
    acc[date].push(commit);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4">
      {/* Header with title and stats */}
      <header className="mb-12 text-center">
        <div className="text-3xl font-bold mb-4">Commits for {repo}</div>
        <div className="text-lg">
          <div className="font-light">
            Total Commits: <span className="font-bold text-emerald-500">{totalCommits}</span>
          </div>
          <div className="font-light">
            Last Commit: <span className="font-bold text-yellow-400">{lastCommitTime}</span>
          </div>
        </div>
      </header>

      {/* Display grouped commits */}
      {Object.entries(groupedCommits).map(([date, commits]) => (
        <div key={date} className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-300">Commits on {date}</h2>
          {commits.map((commit) => (
            <div
              key={commit.sha}
              className="bg-gray-800 p-4 mb-4 rounded-md shadow-md relative"
            >
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">
                  <Link to={`/repos/${owner}/${repo}/commits/${commit.sha}`} className="hover:underline">
                    {commit.commit.message}
                  </Link>
                </div>
                <div className="text-sm text-gray-400">
                  <Link to={`/repos/${owner}/${repo}/commits/${commit.sha}`}>
                    {commit.sha.slice(0, 7)}
                  </Link>
                </div>
              </div>  
              <div className="text-sm text-gray-400 mt-1">
                by {commit.commit.author.name}
              </div>
              {/* View Commit button
              <div className="absolute bottom-4 right-4">
                <Link
                  to={`/repos/${owner}/${repo}/commits/${commit.sha}`}
                  className="inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500 transition"
                >
                  View Commit
                </Link>
              </div> */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CommitList;
