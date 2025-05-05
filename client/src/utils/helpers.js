const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};
const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^(?:\+91[\s\-]?)?[789]\d{9}$/;
  return phoneRegex.test(phone);
};

const isValidPassword = (password) => {
  const passwordRegex = /^.{4,}$/; // Matches any string with at least 4 characters
  return passwordRegex.test(password);
};

export { isValidEmail, isValidPhoneNumber, isValidPassword };
