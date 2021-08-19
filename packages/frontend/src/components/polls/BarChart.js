import React from 'react';
import { Bar } from 'react-chartjs-2';

// defaults.scale.display = false;
const BarChart = ({ poll }) => {
  const [charData] = React.useState({
    labels: [
      poll.option1.option && 'option1',
      poll.option2.option && 'option2',
      poll.option3.option && 'option3',
      poll.option4.option && 'option4',
    ],
    datasets: [
      {
        label: 'Polls Graph',
        backgroundColor: '#2196F3',
        data: [
          poll.option1.count,
          poll.option2.count,
          poll.option3.count,
          poll.option4.count,
        ],
      },
    ],
  });
  return <Bar height={30} width={80} data={charData} />;
};

export default BarChart;
