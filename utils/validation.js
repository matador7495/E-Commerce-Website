/**
 * Validate a username.
 * A valid username must be between 4 and 16 characters long,
 * and contain only letters, numbers, and the underscore character.
 */
const validateUsername = (username) => {
  const regex = /^[a-zA-Z\d_]{4,16}$/;
  return regex.test(username);
};
/**
 * Validate a password.
 * A valid password must be between 4 and 20 characters long.
 */
const validatePassword = (password) => {
  const regex = /^.{4,20}$/;
  return regex.test(password);
};
/**
 * Validate a form with a username and password input.
 *
 * If both the username and password are valid, return true.
 * If either the username or password is invalid, display an alert
 * and return false.
 */
const validateForm = (username, password) => {
  const usernameResult = validateUsername(username);
  const passwordResult = validatePassword(password);
  if (usernameResult && passwordResult) {
    return true;
  } else if (!usernameResult) {
    alert("Please enter a valid username");
  } else if (!passwordResult) {
    alert("Please enter a valid password");
  }
  return false;
};
export default validateForm;
