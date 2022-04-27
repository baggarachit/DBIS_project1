// const {Client} = require('pg')

// const client = new Client({
//   host: "localhost",
//   user : "postgres",
//   port : 5432,
//   password : "rajabose69",
//   database : "lab2db"
// })

// client.connect();

// client.query('select * from team',(err, res) =>{
//   if(!err){
//     console.log(res.rows);
//   } else{
//     console.log(err.message);
//   }
//   client.end;
// })

import express from "express";


          //call function loaded to "express" variable to get express object
                   const app=express();


          //assign port number
                app.listen(3000,()=> {
                                 console.log("server starting on port 3000");
                                     });