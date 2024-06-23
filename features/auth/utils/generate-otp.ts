export const generateOtp = () => {
  const randomNumber = Math.floor(Math.random() * 999999).toString();
  return "0".repeat(6 - randomNumber.length) + randomNumber;
};
