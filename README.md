# APIRESTFUL to register, log, validate and safe users and data
       
##### Security layers:

 Any password, url, host, code, algorithm and tpye of cipher are in the enviroment variables.

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
        
