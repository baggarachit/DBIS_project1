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
const cors = require('cors');
const express = require('express');

const app = express(),
      bodyParser = require("body-parser");
      port = 3080;
app.use(cors());
const users = ['ggggg'];

app.use(bodyParser.json());

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  users.push(user);
  res.json("user addedd");
});

app.get('/', (req,res) => {
    // res.send('App Works !!!!');
    res.json({
      message: 'Hello World'
  });
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});