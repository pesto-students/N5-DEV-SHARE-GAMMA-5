/*eslint-disable */
import { isValidEmail, checkIfEmailExists } from '../../../utils/Helper';
import { render, fireEvent } from '@testing-library/react';
import Landing from '../Landing';
import { AuthProvider } from '../../../context/context';
import { BrowserRouter } from 'react-router-dom';
test('should validate email pattern', () => {
  expect(isValidEmail('narenk70@gmail.com')).toBe(true);
  expect(isValidEmail('naren')).toBe(false);
  expect(isValidEmail(undefined)).toBe(false);
});
test('check if email exists', async () => {
  const data = await checkIfEmailExists('narenk70@gmail.com');
  expect(data).not.toBeNull();
});

test('render', async () => {
  const { getByTestId } = render(
    <AuthProvider>
      <BrowserRouter>
        <Landing></Landing>
      </BrowserRouter>
    </AuthProvider>
  );
  expect(getByTestId('login-email')).toBeTruthy();
  // const btnElem = getByPlaceholderText('btn-text');
  // fireEvent.change(inputElem, { target: { value: 'joshinar' } });
  // fireEvent.click(btnElem);
});
