`use strict`
const nodemailer = require(`nodemailer`)

// async..await is not allowed in global scope, must use a wrapper
let sendemail = (userEmail, userPassword, userCode) =>{
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // create reusable transporter object using the default SMTP transport




  var mailConfig = {

}

var transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    secure : false,
    auth: {
        user:  process.env.EMAIL_USER,
        pass:  process.env.EMAIL_PASS,
    }
})

let message = {
    from: process.env.EMAIL_USER,
    to:  process.env.EMAIL_USER,
    subject: 'Nodemailer is unicode friendly ✔',
    text: 'Hello to myself!',
    html: '<p><b>Hello</b> to myself!</p>'
};

  // send mail with defined transport object
  transporter.sendMail(message, (err, info) => {
    if (err) {
        console.log('Error occurred. ' + err.message);
        return process.exit(1);
    }

    console.log('Message sent: %s', info);
    // Preview only available when sending through an Ethereal account
   // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
})

}


module.exports = sendemail