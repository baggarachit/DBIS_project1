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

var match_off=10
app.get('/match', (req,res1) => {
  match_off=0;
  var string = 'select M.Match_ID, T1.team_name as Team_1, T2.team_name as Team_2, T3.team_name as Winner, V.venue_name as Venue, V.city_name as City, M.season_year as Year from match as M, team as T1, team as T2, team as T3, venue as V where M.team1=T1.team_id and M.team2=T2.team_id and M.match_winner=T3.team_id and M.venue_id=V.venue_id order by M.season_year DESC limit 10';

  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});


app.get('/match/next', (req,res1) => {
    match_off += 10;
    var string = 'select M.Match_ID, T1.team_name as Team_1, T2.team_name as Team_2, T3.team_name as Winner, V.venue_name as Venue, V.city_name as City, M.season_year as Year from match as M, team as T1, team as T2, team as T3, venue as V where M.team1=T1.team_id and M.team2=T2.team_id and M.match_winner=T3.team_id and M.venue_id=V.venue_id order by M.season_year DESC offset '+String(match_off)+' limit 10';
    client.query(string,(err, res) =>{
      if(!err){
        if(res.rows.length<10) match_off -= 10;
        res1.send(res.rows);
      } else{
        res1.send("error");
      }
    });
});

app.get('/match/prev', (req,res1) => {
  match_off = Math.max(0,match_off-10);
  var string = 'select M.Match_ID, T1.team_name as Team_1, T2.team_name as Team_2, T3.team_name as Winner, V.venue_name as Venue, V.city_name as City, M.season_year as Year from match as M, team as T1, team as T2, team as T3, venue as V where M.team1=T1.team_id and M.team2=T2.team_id and M.match_winner=T3.team_id and M.venue_id=V.venue_id order by M.season_year DESC offset '+String(match_off)+' limit 10';
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/match/bat1/:matchID', (req,res1) => {
  var mid = req.params.matchID;
  var string = 'select P.player_name, Count(*) as balls_faced, sum(B.runs_scored) as runs, sum((B.runs_scored=4)::int) as fours, sum((B.runs_scored=6)::int) as sixes from match as M, ball_by_ball as B, player as P where M.match_id = '+String(mid)+' and M.match_id = B.match_id and P.player_id=B.striker and B.innings_no=1 group by(B.striker, P.player_name)';
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/match/bat2/:matchID', (req,res1) => {
  var mid = req.params.matchID;
  var string = 'select P.player_name, Count(*) as balls_faced, sum(B.runs_scored) as runs, sum((B.runs_scored=4)::int) as fours, sum((B.runs_scored=6)::int) as sixes from match as M, ball_by_ball as B, player as P where M.match_id = '+String(mid)+' and M.match_id = B.match_id and P.player_id=B.striker and B.innings_no=2 group by(B.striker, P.player_name)';
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/match/ball1/:matchID', (req,res1) => {
  var mid = req.params.matchID;
  var string = "select P.player_name, Count(*) as balls_bowled, sum(B.runs_scored) as runs_given, sum(((B.out_type is not NULL) and (B.out_type != 'run out'))::int) as wickets from match as M, ball_by_ball as B, player as P where M.match_id = "+ String(mid)+ " and M.match_id = B.match_id and P.player_id=B.bowler and B.innings_no=1 group by(B.bowler, P.player_name)";
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});


app.get('/match/ball2/:matchID', (req,res1) => {
  var mid = req.params.matchID;
  var string = "select P.player_name, Count(*) as balls_bowled, sum(B.runs_scored) as runs_given, sum(((B.out_type is not NULL) and (B.out_type != 'run out'))::int) as wickets from match as M, ball_by_ball as B, player as P where M.match_id = "+ String(mid)+ " and M.match_id = B.match_id and P.player_id=B.bowler and B.innings_no=2 group by(B.bowler, P.player_name)";
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/match/info/:matchID', (req,res1) => {
  var mid = req.params.matchID;
  var string = "select M.match_id, T1.team_name as team1, T2.team_name as team2, T3.team_name as toss_winner, M.toss_name as opt, M.season_year as year from match as M, team as T1, team as T2, team as T3 where M.match_id = "+String(mid)+" and T1.team_id = M.team1 and T2.team_id = M.team2 and T3.team_id = M.toss_winner";
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/match/info/:matchID', (req,res1) => {
  var mid = req.params.matchID;
  var string = "select M.match_id as match_id, T1.team_name as team1, T2.team_name as team2, T3.team_name as toss_winner, M.toss_name as opt, M.season_year as year, V.venue_name from match as M, team as T1, team as T2, team as T3, venue as V where M.match_id = "+String(mid)+" and T1.team_id = M.team1 and T2.team_id = M.team2 and T3.team_id = M.toss_winner and M.venue_id = V.venue_id";
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/match/umpires/:matchID', (req,res1) => {
  var mid = req.params.matchID;
  var string = "select U.umpire_name from umpire as U, umpire_match as UM where U.umpire_id=UM.umpire_id and UM.match_id = "+String(mid);
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/match/t1p/:matchID', (req,res1) => {
  var mid = req.params.matchID;
  var string = "select P.player_name, T.team_name from player as P, player_match as PM, match as M, team as T where P.player_id = PM.player_id and PM.match_id = "+String(mid)+" and PM.team_id = M.team1 and PM.match_id = M.match_id and T.team_id = M.team1";
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/match/t2p/:matchID', (req,res1) => {
  var mid = req.params.matchID;
  var string = "select P.player_name, T.team_name from player as P, player_match as PM, match as M, team as T where P.player_id = PM.player_id and PM.match_id = "+String(mid)+" and PM.team_id = M.team2 and PM.match_id = M.match_id and T.team_id = M.team2";
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