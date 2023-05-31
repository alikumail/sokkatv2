const { PhoneNumberUtil, PhoneNumberType } = require('google-libphonenumber');

// Create an instance of PhoneNumberUtil
const phoneUtil = PhoneNumberUtil.getInstance();

// Function to validate a phone number
const validatePhoneNumber = (phoneNumber, countryCode) => {
  try {
    // Parse the phone number
    const parsedPhoneNumber = phoneUtil.parse(phoneNumber, countryCode);

    // Check if the parsed phone number is valid
    const isValidPhoneNumber = phoneUtil.isValidNumber(parsedPhoneNumber);

    return isValidPhoneNumber;
  } catch (err) {
    // Handle any errors during phone number validation
    console.error('Error validating phone number:', err);
    return false;
  }
};

// Function to get the type of a phone number
const getPhoneNumberType = (phoneNumber, countryCode) => {
  try {
    // Parse the phone number
    const parsedPhoneNumber = phoneUtil.parse(phoneNumber, countryCode);

    // Get the phone number type
    const numberType = phoneUtil.getNumberType(parsedPhoneNumber);

    return PhoneNumberType[numberType];
  } catch (err) {
    // Handle any errors during phone number validation
    console.error('Error getting phone number type:', err);
    return 'Unknown';
  }
};

module.exports = {
  validatePhoneNumber,
  getPhoneNumberType
};
