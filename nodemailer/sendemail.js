`use strict`

const nodemailer = require(`nodemailer`)

module.exports = (userEmail, userCode) => {

  let transporter = nodemailer.createTransport({
    
    tls: { rejectUnauthorized: false },
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    
    auth: {

        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    
    }

  })

  let message = {

    from: process.env.EMAIL_USER,
    to:  userEmail,
    subject: 'Wellcome! This is your validtaion code:',
    html: 
      '<h1><b>Wellcome! </b></h1>'+
      '<h2>This is your validation code: <b>'+userCode+'</b></h2>'+
      '<h3>Please, enter this code in our system to complete your registration</h3>'+
      '<h4>Thank you for your attention</h4>'+
      '<h4>Best regards</h4>'+
      '<h4>System Team</h4>'+ 
      '<h3>This is an automatic message, please do not reply</h3>'+
      '<p>This message was sent to: '+userEmail+'</p>'+
      '<p>This message was sent at: '+new Date()+'</p>'
      
  }

  transporter.verify(function(error, success) {

    if (error) {
  
      console.log(error)
  
    } else {

       transporter.sendMail(message, (err, info) => {

        if (err) {

            console.log('Error occurred. ' + err.message)

            return process.exit(1)
        }
    

      })
  
    }
  
  })

}