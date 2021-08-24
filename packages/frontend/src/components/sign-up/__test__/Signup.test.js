/*eslint-disable */
/**
 * @jest-environment jsdom
 */
import { getCompanyNameFromEmail } from '../../../utils/Helper';
import { render, fireEvent } from '@testing-library/react';
import SignUp from '../SignUp';
import { AuthProvider } from '../../../context/context';
import { BrowserRouter } from 'react-router-dom';

test('extract company name', async () => {
  expect(getCompanyNameFromEmail('narenk70@gmail.com')).toContain('gmail');
});

test('render', async () => {
  const { getByPlaceholderText } = render(
    <AuthProvider>
      <BrowserRouter>
        <SignUp></SignUp>
      </BrowserRouter>
    </AuthProvider>
  );
  expect(getByPlaceholderText('nickname')).toBeTruthy();
  expect(getByPlaceholderText('btn-text')).toBeTruthy();
});

test('input value', async () => {
  const { getByPlaceholderText } = render(
    <AuthProvider>
      <BrowserRouter>
        <SignUp></SignUp>
      </BrowserRouter>
    </AuthProvider>
  );
  const inputElem = getByPlaceholderText('bekBrace');
  fireEvent.change(inputElem, { target: { value: 'joshinar' } });
  expect(inputElem.value).toBe('joshinar');
});
