const nodemailer = require("nodemailer");

module.exports = async (userEmail, subject, htmlTemplate) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.APP_EMAIL_ADDRESS,
        pass: process.env.APP_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.APP_EMAIL_ADDRESS,
      to: userEmail,
      subject: subject,
      html: htmlTemplate,
    };

    const info = await transporter.sendMail(mailOptions, (err, info)=>{
      if(err){
        console.log(err);
      }else {
        console.log("verification email is sent to your gmail account");
        console.log("Email Sent: " + JSON.stringify(info));
      }
    });
  } catch (error) {
    console.log('this is the error of node js mailer : ' + error);
    throw new Error("Internal Server Error (nodemailer)");
  }
};