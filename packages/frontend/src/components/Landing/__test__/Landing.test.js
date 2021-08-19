/*eslint-disable */
import { isValidEmail, checkIfEmailExists } from '../../../utils/Helper';

test('should validate email pattern', () => {
  expect(isValidEmail('narenk70@gmail.com')).toBe(true);
  expect(isValidEmail('naren')).toBe(false);
  expect(isValidEmail(undefined)).toBe(false);
});
test('check if email exists', async () => {
  const data = await checkIfEmailExists('narenk70@gmail.com');
  expect(data).not.toBeNull();
});
