const axios = require ('axios');

const otpGenerator = require("otp-generator");

const OTPModel = require("../models/OTP");
const UserModel = require("../models/Customer");


 const sendOTP = async (mobile) => {
     try {
         let axiosrespose = false;
         const otp = otpGenerator.generate(4, {
             upperCaseAlphabets: false,
             specialChars: false,
             lowerCaseAlphabets: false,
         });
         
         await axios.post('http://basic.unifonic.com/rest/SMS/messages', {
            AppSid: process.env.APP_SID,
            SenderID: process.env.SENDER_ID,
            Recipient:mobile,
            Body: "Verification code is "+otp,
          })
          .then(function (response) {
            axiosrespose = true;
          
          })
          .catch(function (error) {
            axiosrespose = false;
          }); 
          const a = 1;
          if(axiosrespose){
            return {
                success: true,
                message: "code send scuessfully",
            };
          } else {
            return {
                success: false,
                message: "code send falid",
            };
          }
        } catch (error) {
         console.error(error);
         throw error;
     }
 };

const reSendOTP = async (username, mobile, name) => {
     try {
         await rejectPendingOTP(username);
         return await sendOTP(username, mobile, name);
     } catch (error) {
         console.error(error);
         throw error;
     }
 };

 const verifyOTP = async (username, otp) => {
     try {
         const validOTP = await OTPModel.findOne({
             otp,
             username,
             status: "PENDING",
             expireIn: { $gte: new Date().getTime() },
         });

         if (validOTP) {
             await OTPModel.updateOne(
                { _id: validOTP._id },
                 { $set: { status: "CONFIRMED" } }
             );
             await UserModel.updateOne({ username }, { $set: { status: "VERIFIED" } });
             return {
                 success: true,
                 message: "User verified",
             };
         }
         throw new Error("Invalid OTP");
     } catch (error) {
         console.error(error);
         throw error;
     }
 };

 const sendVerificationMessage =  async (otp, mobileNumber) => {
    try {
       axios.post('http://basic.unifonic.com/rest/SMS/messages', {
        AppSid: process.env.APP_SID,
        SenderID: process.env.SENDER_ID,
        Recipient:'mobileNumber',
        Body: "Verification code is "+otp,
      })
      .then(function (response) {
        return {
            success: true,
            message: "code send scuessfully",
        };
      
      })
      .catch(function (error) {
        return {
            success: false,
            message: "code send falid",
        };
      });
      
    } catch (error) {
        console.error(error);
        throw error;
    }
    
 };

 module.exports = {
     sendOTP,
     sendVerificationMessage,
     verifyOTP,
     reSendOTP,

 } ;
