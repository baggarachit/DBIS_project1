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

2
app.get('/match', (req,res1) => {
    var string = 'select M.match_id, T1.team_name as team1, T2.team_name as team2, T3.team_name as winner, V.venue_name, V.city_name, M.season_year from match as M, team as T1, team as T2, team as T3, venue as V where M.team1=T1.team_id and M.team2=T2.team_id and M.match_winner=T3.team_id and M.venue_id=V.venue_id order by M.season_year DESC';
    client.query(string,(err, res) =>{
      if(!err){
        res1.send(res.rows);
      } else{
        res1.send("error");
      }
    });
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});