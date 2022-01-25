# APIRESTFUL to register, log, validate and safe users and data

## This project is an Node JS API to register and validate your users, and protect your data
 
### This projects count with the next npm packages:

       -Express
       -Dotenv
       -Jsonwebtoken
       -MongoDB
       -NodeMailer
   
 
       This APIRESTFUL is an open source project wich you allow to use a nodejs based server to init a escalable project.
       This derives for years and years to write parts and debugs APIs from my side, and I decided to write the base of a "definitive" APIRESTFUL to create or connect with any other web service.
       
##### Security layers:

 Well, any password, url, host, code, algorithm and tpye of cipher are in the enviroment variables.

  - The JWT config headers are compossed by enviroment variables to allow you to change the type of hash what you want securelly too.
   You can edit the files /auth and /verify to decide if you want to work with the entire token or not, I try to carry all things to maximun level of confidentiallity.
  - The data in database are cypher too.

###### USE:

    Supossing you have installed Node JS and MongoDB your OS:


 - git clone https://github.com/tobiasalbirosa/registrator/


 - cd registrator


  - npm i


  - node server.js

 ###### API Routes DOCUMENTATION:
 
 
 - POST /register
   
       body {
              
              email  : "EMAIL@EXAMPLE",
        
              password : "PASSWORD",
        
              confirmpassword : "PASSWORD"

       }
   
 - POST /verify

       body {
        
              email  : "EMAIL@EXAMPLE",
        
              password : "PASSWORD",
        
              code : "EMAIL_CODE"

       }
    
   
 - POST /login
 
       body {
       
              email  : "EMAIL@EXAMPLE.COM",
        
              password : "PASSWORD"
       
       }
        
 
 - POST /logout

       headers {

              Authorization : "INCOMPLETE TOKEN"
       }

       body {

              email  : "EMAIL@EXAMPLE.COM",
        
              password : "PASSWORD",
        
              token  : "INCOMPLETE TOKEN"
       
       }
        
