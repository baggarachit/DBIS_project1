const {Client} = require('pg')

const client = new Client({
  host: "localhost",
  user : "postgres",
  port : 5432,
  password : "rajabose69",
  database : "lab2db"
})

client.connect();


const express = require('express');
const cors = require('cors');

const app = express(),
      port = 3080;

app.use(cors());


app.get('/', (req,res1) => {
    client.query('select * from team',(err, res) =>{
      if(!err){
        res1.send(res.rows);
      } else{
        res1.send("error")
      }
    });
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});