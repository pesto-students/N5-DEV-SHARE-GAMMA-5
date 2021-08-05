import React, { useState } from 'react';

const colors = [
  '#3B49DF',
  '#EA4E28',
  '#3C9559',
  '#4A245D',
  '#26BE00',
  '#73C7E6',
];
// eslint-disable-next-line
const CompanyItem = ({
  company,
  idx,
  setCount,
  count,
  selectedCompanies,
  setSelectedCompanies,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const handleSelection = (value) => {
    if (selectedCompanies.includes(value)) {
      const filteredData = selectedCompanies.filter((item) => item !== value);
      setSelectedCompanies(filteredData);
      setCount(count - 1);
    } else {
      setSelectedCompanies([...selectedCompanies, company]);
      setCount(count + 1);
    }
  };
  if (company) {
    return (
      <div
        className='company-item'
        style={{
          borderColor: `${!isSelected ? '#7b857e' : colors[idx]}`,
        }}
      >
        <h4>{`${company[0].toUpperCase()}${company.slice(1)}`}</h4>
        <button
          type='button'
          className='select-btn mt-2'
          style={{
            backgroundColor: `${!isSelected ? '#7b857e' : colors[idx]}`,
          }}
          onClick={() => {
            setIsSelected(!isSelected);
            handleSelection(company);
          }}
          value='select'
        >
          {isSelected ? 'Selected' : 'Select'}
        </button>
      </div>
    );
  }
  return null;
};

export default CompanyItem;
