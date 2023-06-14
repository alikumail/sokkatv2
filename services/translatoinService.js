const translations = require('../models/translations');

// Function to translate a key based on the user's locale
// Store translation in translations file in models folder.
function translate(key,lang) {
  if(lang == 'ar' || lang == 'arabic'){
    const userLocale = 'ar';
  }else{
    const userLocale = 'en';
  }
  const translation = translations[userLocale][key];
  if (!translation) {
    translation = translations[userLocale]['en'];
  //  return key; 
  }
  return translation;
}

module.exports = {
  translate
};
