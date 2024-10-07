import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCommitDetails } from '../services/api';

const CommitDetails = () => {
  const { owner, repo, sha } = useParams();
  const navigate = useNavigate();
  const [commitDetails, setCommitDetails] = useState(null);

  useEffect(() => {
    const fetchCommitDetails = async () => {
      try {
        const details = await getCommitDetails(owner, repo, sha);
        setCommitDetails(details);
      } catch (error) {
        console.error('Error fetching commit details:', error);
      }
    };
    fetchCommitDetails();
  }, [owner, repo, sha]);

  if (!commitDetails) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-gray-300 rounded-lg shadow-lg">
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-yellow-400">Commit Details</h1>
        <p className="text-sm text-gray-400">SHA: {sha}</p>
      </header>

      {/* Author and Message Section */}
      <section className="bg-gray-800 p-6 rounded-lg mb-8">
        <div className="mb-4">
          <span className="font-semibold">Author:</span> {commitDetails.commit.author.name}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Date:</span> {new Date(commitDetails.commit.author.date).toLocaleString()}
        </div>
        <div className="italic">
          <span className="font-semibold">Message:</span> {commitDetails.commit.message}
        </div>
      </section>

      {/* Files Changed Section */}
      <section className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-green-400 mb-4">Files Changed</h2>
        <ul className="divide-y divide-gray-700">
          {commitDetails.files.map((file) => (
            <li key={file.filename} className="flex justify-between py-4">
              <span className="text-gray-200">{file.filename}</span>
              <span className="text-green-400">
                +{file.additions} / -{file.deletions}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Button to View Commit Graph */}
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate(`/repos/${owner}/${repo}/commits/${sha}/graph`)}
          className="bg-green-400 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition duration-300"
        >
          View Commits Graph
        </button>
      </div>
    </div>
  );
};

export default CommitDetails;
