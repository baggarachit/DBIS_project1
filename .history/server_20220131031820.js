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

const express = require('express');
const cors = require('cors');

const app = express(),
      port = 3080;

app.use(cors());


app.get('/', (req,res) => {
    res.json({
      message: 'Hello World'
  });
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});