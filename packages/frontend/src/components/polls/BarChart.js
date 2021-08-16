import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ poll }) => {
  const [charData] = React.useState({
    labels: [
      poll.option1.option && 'Option1',
      poll.option2.option && 'Option2',
      poll.option3.option && 'Option3',
      poll.option4.option && 'Option4',
    ],
    datasets: [
      {
        label: 'Votes',
        backgroundColor: '#2196f3',
        data: [
          poll.option1.count,
          poll.option2.count,
          poll.option3.count,
          poll.option4.count,
        ],
      },
    ],
  });
  useEffect(() => {}, [poll]);
  return <Bar height={30} width={80} data={charData} />;
};

export default BarChart;
