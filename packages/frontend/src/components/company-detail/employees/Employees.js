import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../../../firebase';
import userImg from '../../../assets/unknown.png';
import './employees.scss';

const Employees = ({ companyName }) => {
  const [employees, setEmployees] = useState([]);
  const fetchEmployees = async () => {
    const employeesDetails = [];
    const data = await app
      .firestore()
      .collection('users')
      .where('company', '==', companyName.toLowerCase())
      .get();
    if (data.docs) {
      data.docs.forEach((doc) => {
        employeesDetails.push(doc.data());
      });
      setEmployees(employeesDetails);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, [companyName]);
  return (
    <div className='employees-container mt-4'>
      {employees
        && employees.map((employee, idx) => (
          // eslint-disable-next-line
          <div className='employee-item' key={idx}>
            <img src={userImg} alt='' />
            <h6 className='mt-2'>{employee.nickName}</h6>
            <Link to={`/user/${employee.nickName}`}>
              <button type='button' className='btn btn-sm btn-secondary'>
                View Profile
              </button>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Employees;
