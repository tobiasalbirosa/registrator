`use strict`
const nodemailer = require(`nodemailer`)

let sendemail = (userEmail, userPassword, userCode) => {

let transporter = nodemailer.createTransport({
    tls: { rejectUnauthorized: false },
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

let message = {
  from: process.env.EMAIL_USER,
  to:  userEmail,
  subject: 'This is your validtaion code',
  text: 'Use this code to activate your account '+ 0000,
  html: '<p><b>Hello</b> to myself! '+ 0000 + ' </p>'
}

transporter.verify(function(error, success) {
  if (error) {
       console.log(error);
  } else {
       console.log('Server is ready to take our messages')
       transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
    
        console.log('Message sent: %s', info);

      })
  }
})

}

module.exports = sendemail