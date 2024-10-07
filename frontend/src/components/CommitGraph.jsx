import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getCommits } from '../services/api';
import { useParams } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CommitGraph = () => {
  const { owner, repo } = useParams();
  const [commitData, setCommitData] = useState({});

  useEffect(() => {
    const fetchCommitData = async () => {
      const commits = await getCommits(owner, repo);

      // Check if commits have valid stats before mapping
      const labels = commits.map((commit) => commit.commit.author.date);
      const additions = commits.map((commit) => commit.stats?.additions || 0);
      const deletions = commits.map((commit) => commit.stats?.deletions || 0);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Lines Added',
            data: additions,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
          {
            label: 'Lines Deleted',
            data: deletions,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
          },
        ],
      };

      setCommitData(chartData);
    };

    fetchCommitData();
  }, [owner, repo]);

  return (
    <div>
      <h2>Commit Graph for {repo}</h2>
      {commitData.labels && <Bar data={commitData} />}
    </div>
  );
};

export default CommitGraph;
