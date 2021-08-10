import React, { useState } from 'react';

const CompanyItem = ({
  company,
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
      setSelectedCompanies([...selectedCompanies, value]);
      setCount(count + 1);
    }
  };
  if (company) {
    return (
      <div
        className='company-item'
        style={{
          borderColor: `${!isSelected ? '#7b857e' : '#CCCCCC'}`,
        }}
      >
        <h4>{`${company.name[0].toUpperCase()}${company.name.slice(1)}`}</h4>
        <img src={company.imageUrl} alt='' height={30} />
        <button
          type='button'
          className='select-btn mt-2'
          style={{
            backgroundColor: `${!isSelected ? '#7b857e' : '#666967'}`,
          }}
          onClick={() => {
            setIsSelected(!isSelected);
            handleSelection(company.name);
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
