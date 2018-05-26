module.exports={
    port:process.env.PORT || 3000,
    db:{
       database:process.env.DB_NAME || 'drivingschool' ,
       user:process.env.DB_USER || 'root',
       passwors:process.env.DB_PASS || 'root',
       options:{
           dialect:process.env.DIALECT ||'mongoose',
           host:process.env.HOST || 'localhost',
           storage:'mongodb://root:root@ds016118.mlab.com:16118/drivingschool'
       }
    },
    authentification:{
        jwtSecret:process.env.JWT_SECRET || 'secret'
    }
       
    
}
//var mongoDB = 'mongodb://root:root@ds016118.mlab.com:16118/drivingschool';
