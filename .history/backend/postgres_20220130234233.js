const {Client} = require('pg')

const client = new Client({
  host: "localhost",
  user : "postgres",
  port : 5432,
  password : "rajabose69",
  database : "lab2db"
})

client.connect();

client.query('select * from team',(err, res) =>{
  if(!err){
    console.log(res.rows);
  } else{
    console.log(err.message);
  }
  client.end;
})