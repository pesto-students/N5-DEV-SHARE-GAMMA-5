/*eslint-disable */
import { render, fireEvent } from '@testing-library/react';
import Dashboard from '../Dashboard';
import { AuthProvider } from '../../../context/context';
import { BrowserRouter } from 'react-router-dom';

test('render', async () => {
  const fetchCompanies = jest.fn();
  const fetchInterests = jest.fn();
  const location = { state: { dashboard: 'userFeed' } };
  const { getByTestId } = render(
    <AuthProvider>
      <BrowserRouter>
        <Dashboard
          fetchCompanies={fetchCompanies}
          fetchInterests={fetchInterests}
          location={location}
        ></Dashboard>
      </BrowserRouter>
    </AuthProvider>
  );
//   expect(getByTestId('dashboard')).toBeTruthy();
  //   await expect(fetchInterests).toHaveBeenCalled();
});
