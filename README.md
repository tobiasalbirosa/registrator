# API Registration, login and email validator

 ## This project is an Node JS API to register and validate your users

 Register and login with email verification on NodeJS to MongoDB

    Supossing you have installed Node JS and MongoDB your OS:

 - git clone https://github.com/tobiasalbirosa/registrator/

 - cd registrator

  - npm i

  - node server.js


 ### API Routes:
 
 - POST /register
  
   
   
        email  : "EMAIL@EXAMPLE",
        
        password : "PASSWORD",
        
        confirmpassword : "PASSWORD"
        
   
   
 - POST /verify
 
        
    
        email  : "EMAIL@EXAMPLE",
        
        password : "PASSWORD",
        
        code : "EMAIL_CODE"
        
    
   
 - POST /login
 
        
        email  : "EMAIL@EXAMPLE.COM",
        
        password : "PASSWORD"
        
    
  
