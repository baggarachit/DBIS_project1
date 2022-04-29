global.queslist = [];
global.sum = 60;
function recurse(t,i,currsum,ll){
  if(currsum==global.sum){
    queslist.push(ll);
  }
  if(currsum<global.sum && i<t.length){
    recurse(t,i+1,currsum+t[i],ll.concat(i));
    recurse(t,i+1,currsum,ll);
  }
}

const {Client} = require('pg')

const client = new Client({
  host: "localhost",
  user : "postgres",
  port : 5432,
  password : "pseudotourist",
  database : "postgres"
})

client.connect();


const express = require('express');
const cors = require('cors');

const app = express(),
      port = 3080;

app.use(cors());

global.isTa = false;
var taid = -1;
global.partid = -1;

app.get('/participant/:uid/:pwd', (req,res1) => {
  var ud = req.params.uid;
  var pd = req.params.pwd;
  console.log(ud);
  // var pwd = req.params.pwd;
  var string = "select * from participant where id = "+ud+" and password = '"+pd+"'";
  client.query(string,(err, res) =>{
    if(!err){
      // global.partid = parseInt(ud);
      console.log(ud);
      // console.log("jnjnjjnfnfjn");
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/courses/:role/:uid', (req,res1) => {
  // console.log("wlwowowowoowowowowowoowowowowow");
  var role = req.params.role;
  var ud = req.params.uid;
  global.partid = parseInt(ud);
  
  console.log(ud);
  // var pwd = req.params.pwd;
  var string = "select * from "+String(role)+"_course as SC, courses as C where SC.c_id=C.id and SC."+String(role)[0]+"_id = "+ud;
  console.log(string);
  client.query(string,(err, res) =>{
    if(!err){
      // console.log("yaya");
      res1.send(res.rows);
    } else{
      // console.log("noo");
      res1.send("error");
    }
  });
});

app.get('/courses/:uid', (req,res1) => {
  var ud = req.params.uid;
  global.partid = parseInt(ud);
  
  console.log(ud);
  // var pwd = req.params.pwd;
  var string = "select * from ta, courses as C where ta.s_id = "+String(ud)+" and C.id=ta.c_id";
  console.log(string);
  client.query(string,(err, res) =>{
    if(!err){
      // console.log("yaya");
      res1.send(res.rows);
      if (res.rows.length == 0){
        global.isTa = false;
        console.log("djjfnjnfjnjnfjnjn");
        taid = parseInt(ud);
      }
      else{
        global.isTa = true;
        taid=-1;
      }
    } else{
      // console.log("noo");
      res1.send("error");
    }
  });
});

app.get('/course/:c_id', (req,res1) => {
  var cd = req.params.c_id;
  // console.log(ud);
  var string = "select * from exam_course as EC, exams as E where EC.e_id=E.id and EC.c_id = "+cd;
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/exam/:e_id', (req,res1) => {
  var ed = req.params.e_id;
  // console.log(ud);
  var string = "select * from ques_exam as QE, Question as Q where QE.q_id=Q.id and QE.e_id = "+ed;
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/ques/:q_id', (req,res1) => {
  var qd = req.params.q_id;
  var dic={};
  // console.log(ud);
  var string = "select * from question as Q, ques_subtopic QS, subtopic_topic as ST where Q.id=QS.q_id and QS.st_id = ST.st_id and Q.id = "+qd;
  client.query(string,(err, res) =>{
    if(!err){
      dic["data1"]=res.rows;
      string = `select count(*) from ques_exam as QE where QE.q_id=${qd}`;
      client.query(string,(err, res2) =>{
        if(!err){
          dic["data2"]=res2.rows;
          console.log(dic);
          res1.send(dic);
        } else{
          dic["data2"]="error";
        }
    })
   } else{
     dic["data1"]="error";
      res1.send("error");
    }
  });
});

app.get('/isfeed/:u_id/:q_id', (req,res1) => {
  var ud = req.params.u_id;
  var qd = req.params.q_id;
  // console.log(ud);
  var string = "select * from feedback as F where F.s_id = "+String(ud)+" and F.q_id = "+String(qd);
  console.log(string);
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/get-new-exam', (req,res1) => {
  var diff = req.query.difficulty;
  var dur = req.query.duration;
  var mar = req.query.marks;
  var tops = req.query.topics;
  var cd = req.query.course;
  var topics = tops.split(",");
  var topics_str = "";
  for(var i=0;i<topics.length;i++) {
    topics[i]=Number(topics[i].trim());
    if(isNaN(topics[i])) res1.send("Wrong sub-topics");
    topics_str = topics_str + String(topics[i])+",";
  }
  topics_str = "("+topics_str+"-10)"
  console.log(topics_str);
  // for(var i=0;i)
  // console.log("owow");
  // console.log(ud);
  var string = `select DISTINCT Q.id, Q.difficulty, Q.time_taken from Question as Q, ques_subtopic as QS, subtopic_topic as ST, topic_course as TC where QS.q_id=Q.id and ST.st_id=QS.st_id and ST.t_id in ${topics_str} and TC.c_id=${course} and ST.t_id=TC.t_id limit 10`;
  console.log(topics);
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

var match_off=10
app.get('/match', (req,res1) => {
  match_off=0;
  var string = 'select M.Match_ID, T1.team_name as Team_1, T2.team_name as Team_2, T3.team_name as Winner, V.venue_name as Venue, V.city_name as City, M.season_year as Year, M.win_type, M.win_margin from match as M, team as T1, team as T2, team as T3, venue as V where M.team1=T1.team_id and M.team2=T2.team_id and M.match_winner=T3.team_id and M.venue_id=V.venue_id order by M.season_year DESC limit 10';

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
    var string = 'select M.Match_ID, T1.team_name as Team_1, T2.team_name as Team_2, T3.team_name as Winner, V.venue_name as Venue, V.city_name as City, M.season_year as Year, M.win_type, M.win_margin from match as M, team as T1, team as T2, team as T3, venue as V where M.team1=T1.team_id and M.team2=T2.team_id and M.match_winner=T3.team_id and M.venue_id=V.venue_id order by M.season_year DESC offset '+String(match_off)+' limit 10';
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
  var string = 'select M.Match_ID, T1.team_name as Team_1, T2.team_name as Team_2, T3.team_name as Winner, V.venue_name as Venue, V.city_name as City, M.season_year as Year, M.win_type, M.win_margin from match as M, team as T1, team as T2, team as T3, venue as V where M.team1=T1.team_id and M.team2=T2.team_id and M.match_winner=T3.team_id and M.venue_id=V.venue_id order by M.season_year DESC offset '+String(match_off)+' limit 10';
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
  var string = 'select P.player_id, P.player_name, Count(*) as balls_faced, sum(B.runs_scored) as runs, sum((B.runs_scored=4)::int) as fours, sum((B.runs_scored=6)::int) as sixes from match as M, ball_by_ball as B, player as P where M.match_id = '+String(mid)+' and M.match_id = B.match_id and P.player_id=B.striker and B.innings_no=1 group by(P.player_id, B.striker, P.player_name)';
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
  var string = 'select P.player_id, P.player_name, Count(*) as balls_faced, sum(B.runs_scored) as runs, sum((B.runs_scored=4)::int) as fours, sum((B.runs_scored=6)::int) as sixes from match as M, ball_by_ball as B, player as P where M.match_id = '+String(mid)+' and M.match_id = B.match_id and P.player_id=B.striker and B.innings_no=2 group by(P.player_id, B.striker, P.player_name)';
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
  var string = "select P.player_id, P.player_name, Count(*) as balls_bowled, sum(B.runs_scored) as runs_given, sum(((B.out_type is not NULL) and (B.out_type != 'run out'))::int) as wickets from match as M, ball_by_ball as B, player as P where M.match_id = "+ String(mid)+ " and M.match_id = B.match_id and P.player_id=B.bowler and B.innings_no=1 group by(P.player_id, B.bowler, P.player_name)";
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
  var string = "select P.player_id, P.player_name, Count(*) as balls_bowled, sum(B.runs_scored) as runs_given, sum(((B.out_type is not NULL) and (B.out_type != 'run out'))::int) as wickets from match as M, ball_by_ball as B, player as P where M.match_id = "+ String(mid)+ " and M.match_id = B.match_id and P.player_id=B.bowler and B.innings_no=2 group by(P.player_id, B.bowler, P.player_name)";
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/match/overall/:matchID', (req,res1) => {
  var mid = req.params.matchID;
  var string = "select B.innings_no, sum(B.extra_runs) as extra_runs, sum(B.runs_scored+B.extra_runs) as total, sum((B.out_type is not NULL)::int) as wickets from match as M, ball_by_ball as B where M.match_id = "+String(mid)+" and B.match_id = M.match_id group by (B.innings_no) order by B.innings_no ASC";
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
  var string = "select M.match_id as match_id, T1.team_name as team1, T2.team_name as team2, T3.team_name as toss_winner, M.toss_name as opt, M.season_year as year, V.venue_name from match as M, team as T1, team as T2, team as T3, venue as V where M.match_id = "+String(mid)+" and T1.team_id = M.team1 and T2.team_id = M.team2 and T3.team_id = M.toss_winner and M.venue_id = V.venue_id ";
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

app.get('/match/whowon/:matchID', (req,res1) => {
  var mid = req.params.matchID;
  var string = "select T.team_name, M.win_type, M.win_margin from match as M, team as T where match_id = "+String(mid)+" and T.team_id = M.match_winner";
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/match/i1/:matchID', (req,res1) => {
  var mid = req.params.matchID;
  var string = "with tmp(oid, runs, wi) as ( select B.over_id, sum(B.runs_scored+B.extra_runs), sum((B.out_type is not NULL)::int) from ball_by_ball as B where B.match_id = "+String(mid)+" and B.innings_no=1 group by (B.over_id) order by B.over_id) select sum(runs) over (order by oid asc rows between unbounded preceding and current row) as runs, wi>0 as wicket from tmp";
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/match/i2/:matchID', (req,res1) => {
  var mid = req.params.matchID;
  var string = "with tmp(oid, runs, wi) as ( select B.over_id, sum(B.runs_scored+B.extra_runs), sum((B.out_type is not NULL)::int) from ball_by_ball as B where B.match_id = "+String(mid)+" and B.innings_no=2 group by (B.over_id) order by B.over_id) select sum(runs) over (order by oid asc rows between unbounded preceding and current row) as runs, wi>0 as wicket from tmp";
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});


app.get('/match/i1_batsum/:matchID', (req,res1) => {
  var mid = req.params.matchID;
  var string = "select P.player_id, P.player_name, sum(runs_scored) as runs, count(*) as balls from player as P, ball_by_ball as B where B.match_id = "+String(mid)+" and P.player_id = B.striker and B.innings_no =1 group by(P.player_id, P.player_name) order by runs DESC, balls ASC, P.player_name ASC Limit 3";
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/match/i2_batsum/:matchID', (req,res1) => {
  var mid = req.params.matchID;
  var string = "select P.player_id, P.player_name, sum(runs_scored) as runs, count(*) as balls from player as P, ball_by_ball as B where B.match_id = "+String(mid)+" and P.player_id = B.striker and B.innings_no =2 group by(P.player_id, P.player_name) order by runs DESC, balls ASC, P.player_name ASC Limit 3";
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/match/i1_ballsum/:matchID', (req,res1) => {
  var mid = req.params.matchID;
  var string = "with tmp(pid, pname, runs, wckts, overs, balls) as (select P.player_id, P.player_name, sum(runs_scored) as runs_given, sum(((B.out_type is not NULL) and (B.out_type != 'run out') and (B.out_type != 'retired hurt'))::int) as wickets, count(*)/6, mod(count(*),6) from player as P, ball_by_ball as B where B.match_id = "+String(mid)+" and P.player_id = B.bowler and B.innings_no =1 group by(P.player_id, P.player_name) order by wickets DESC, runs_given ASC, P.player_name ASC Limit 3) select * from tmp where tmp.wckts>0";
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/match/i2_ballsum/:matchID', (req,res1) => {
  var mid = req.params.matchID;
  var string = "with tmp(pid, pname, runs, wckts, overs, balls) as (select P.player_id, P.player_name, sum(runs_scored) as runs_given, sum(((B.out_type is not NULL) and (B.out_type != 'run out') and (B.out_type != 'retired hurt'))::int) as wickets, count(*)/6, mod(count(*),6) from player as P, ball_by_ball as B where B.match_id = "+String(mid)+" and P.player_id = B.bowler and B.innings_no =2 group by(P.player_id, P.player_name) order by wickets DESC, runs_given ASC, P.player_name ASC Limit 3) select * from tmp where tmp.wckts>0";
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/match/pie/:matchID', (req,res1) => {
  var mid = req.params.matchID;
  var string = "with tmp(inn, ones, twos, threes, fours, sixes, extras, total) as ( select B.innings_no, sum((runs_scored=1)::int)*1.0, sum((runs_scored=2)::int)*2.0, sum((runs_scored=3)::int)*3.0, sum((runs_scored=4)::int)*4.0, sum((runs_scored=6)::int)*6.0, sum(extra_runs)*1.0, sum(runs_scored+extra_runs)*1.0 from ball_by_ball as B where B.match_id = "+String(mid)+" group by B.innings_no) select inn, round(ones/total*100,2) as ones, round(twos/total*100,2) as twos, round(threes/total*100,2) as threes, round(fours/total*100,2) as fours, round(sixes/total*100,2) as sixes, round(extras/total*100,2) as extras from tmp order by inn ASC";
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/venues', (req,res1) => {
  var string = "select * from venue";
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/venue/:venueID', (req,res1) => {
  var vid = req.params.venueID;
  var string = "with tmp(mid,inn,tr) as ( select M.match_id, B.innings_no, sum(B.runs_scored+B.extra_runs) from venue as V left outer join match as M on M.venue_id = V.venue_id left outer join ball_by_ball as B on B.match_id = M.match_id where V.venue_id = "+String(vid)+" group by (V.venue_id, M.match_id, B.innings_no)) Select V.venue_name, V.city_name, V.country_name, V.capacity, count(DISTINCT M.match_id), coalesce((select max(tr) from tmp),0) as max, coalesce((select min(tr) from tmp),0) as min, coalesce((select max(T1.tr) from tmp as T1, tmp as T2 where T1.mid =T2.mid and T1.inn< T2.inn and T1.tr < T2.tr)+1,0) as highest_chased from venue as V left outer join match as M on M.venue_id = V.venue_id left outer join ball_by_ball as B on B.match_id = M.match_id where V.venue_id= "+String(vid)+" group by V.venue_id;";
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/venue/winpie/:venueID', (req,res1) => {
  var vid = req.params.venueID;
  var string = "select round((sum((win_type = 'runs')::int)*100.0)/count(*),2) as bat_first, round((sum((win_type = 'wickets')::int)*100.0)/count(*),2) as ball_first from match as M where M.venue_id = "+String(vid);
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/venue/avg1/:venueID', (req,res1) => {
  var vid = req.params.venueID;
  var string = "with tmp(year, total) as ( select M.season_year, sum(B.runs_scored+B.extra_runs)*1.0 from match as M, ball_by_ball as B where M.match_id = B.match_id and M.venue_id ="+String(vid)+" and B.innings_no=1 group by (M.match_id, M.season_year)) select year, avg(total) from tmp group by year";
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/years',function(req,res1){

  var string="select DISTINCT season_year from match order by season_year DESC";

  client.query(string,(err,res)=>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  })
});

app.get('/pointstable/:year', (req,res1) => {
  var year = req.params.year;
  var string=`with inf33 as
  (with inf2 as (with inf1 as (with inf as 
  (with i1(match_id,team1,team2,innings_no,runs,balls,match_winner,win_type,rr)
  as
  (with i0(match_id,team1,team2,innings_no,runs,balls,match_winner,win_type) as 
  (select match.match_id,team1,team2,innings_no,
  sum(runs_scored+extra_runs),
  count(distinct over_id),match_winner,win_type 
  from match,ball_by_ball where match.match_id=ball_by_ball.match_id 
  and season_year=${year} group by match.match_id,innings_no order by match_id)
  select *,runs*1.0/balls from i0)
  select a.match_id,a.team1,a.team2,a.runs as runs1,a.balls as balls1,
  b.runs as runs2,b.balls as balls2,a.match_winner
  from i1 as a,i1 as b where a.innings_no!=b.innings_no
  and a.match_id=b.match_id and
  ((a.win_type='runs' and ((a.match_winner=a.team1 and a.innings_no=1) 
  or (a.match_winner=a.team2 and a.innings_no=2)))
  or (a.win_type='wickets' and ((a.match_winner=a.team2 and a.innings_no=1)
  or (a.match_winner=a.team1 and a.innings_no=2))))) 
  select match_id,team1,team2,runs1,balls1,runs2,balls2
  ,1 as match1,1 as match2,case when match_winner=team1 then 1 else 0 end
  as team1win,case when match_winner=team2 then 1 else 0 end 
  as team2win,match_winner from inf) select team_name,sum(1) 
  as mat,sum(case when team_id=team1 then team1win else team2win end) 
  as win,0 as tied,sum(case when team_id=team1 then runs1 else runs2 end) 
  as runsscor,sum(case when team_id=team1 then balls1 else balls2 end) as ballsscor,
  sum(case when team_id!=team1 then runs1 else runs2 end) as runsagainst,
  sum(case when team_id!=team1 then balls1 else balls2 end) as ballsagainst,
  sum(case when match_winner=team_id then 2 else 0 end) as pts 
  from inf1,team where team1=team_id or team2=team_id group by team_name 
  order by pts desc) select *,mat-win as loss from inf2)
  select team_name,mat,win,loss,tied,Round(((runsscor*1.0/ballsscor)
  -(runsagainst*1.0/ballsagainst)),2) as nrr,pts from inf33 order by pts desc,nrr desc`;
  client.query(string,(err, res) =>{
    if(!err){
      res1.send(res.rows);
    } else{
      res1.send("error");
    }
  });
});

app.get('/player/:player_id', (req,res1) => {
  // console.log("hh");
  var playerid=req.params.player_id;
  var string = `select player_name as Player_Name,country_name as Country,batting_hand as Batting_Style,bowling_skill as Bowling_Skill from player where player_id=${playerid}`;
  // console.log(string);
  var dic={};
  // dic["hh"]="gaurav";
  client.query(string,(err, res) =>{
    if(!err){
      dic["data1"]=res.rows;
      string = `with i0(Matches) as (select count(*) from (select distinct match_id from player,ball_by_ball where player_id=striker and striker=${playerid}) as foo) ,i1(Balls,Runs) as (select count(*),sum(runs_scored) from player,ball_by_ball where player_id=striker and striker=${playerid}) ,i2(Four) as (select count(*) from player,ball_by_ball where player_id=striker and striker=${playerid} and runs_scored=4) ,i3(Six) as  (select count(*) from player,ball_by_ball where player_id=striker and striker=${playerid} and runs_scored=6) ,i4(Fifty) as (select count(*) from (select sum(runs_scored) as runs_scored from player,ball_by_ball where player_id=striker and striker=${playerid} group by match_id) as foo where (runs_scored>=50 and runs_scored<100)) ,i5(HS) as  (select max(runs_scored) from (select sum(runs_scored) as runs_scored from player,ball_by_ball where player_id=striker and striker=${playerid} group by match_id) as foo) ,i6(Out) as  (select count(*) from player,ball_by_ball where player_id=striker and striker=${playerid} and out_type is not null) select Matches,Runs,Four,Six,Fifty,HS,Round((Runs*100.0/Balls),2) as Strike_Rate,Round((Runs*1.0)/(case when Out=0 then 1 else Out end),2) as Average from i0,i1,i2,i3,i4,i5,i6`;
      client.query(string,(err, res2) =>{
        if(!err){
          dic["data2"]=res2.rows;
          // console.log(res.rows);
          string=`with low(match_id,runs_scored_low) as (with i1(match_id,runs_scored) as (select match_id,sum(runs_scored) from player,ball_by_ball where player_id=striker and striker=${playerid} group by match_id) select match_id, case when runs_scored>=30 then 0 else runs_scored end as runs_scored from i1) ,middle(match_id,runs_scored_middle) as (with i1(match_id,runs_scored) as (select match_id,sum(runs_scored) from player,ball_by_ball where player_id=striker and striker=${playerid} group by match_id) select match_id, case when runs_scored<30 or runs_scored>50 then 0 else runs_scored end as runs_scored from i1) ,high(match_id,runs_scored_high) as (with i1(match_id,runs_scored) as (select match_id,sum(runs_scored) from player,ball_by_ball where player_id=striker and striker=${playerid} group by match_id) select match_id, case when runs_scored<50 then 0 else runs_scored end as runs_scored from i1) select low.match_id,runs_scored_low,runs_scored_middle,runs_scored_high from low,middle,high where low.match_id=middle.match_id and low.match_id=high.match_id`;
          client.query(string,(err, res3)=>{
            if(!err){
              dic["data3"]=res3.rows;
              string=`with inf0 as (with inf(match_id,runs,balls,overs,wickets) as (select match_id,sum(runs_scored),sum(1),count(distinct over_id),sum(case when (out_type is null or out_type='run out' or out_type='retired hurt') then 0 else 1 end) from ball_by_ball where bowler=${playerid} group by match_id) select count(*) as matches,sum(runs) as runs,sum(balls) as balls,sum(overs) as overs,sum(wickets) as wickets,sum(case when wickets>=5 then 1 else 0 end) as five_wickets from inf) select *,Round(runs*1.0/overs,2) as economy from inf0`;
              client.query(string,(err,res4)=>{
                if(!err){
                  dic["data4"]=res4.rows;
                  string=`with inf(match_id,runs,wickets) as (select match_id,sum(runs_scored),sum(case when (out_type is null or out_type='run out' or out_type='retired hurt') then 0 else 1 end) from ball_by_ball where bowler=${playerid} group by match_id) select * from inf`;
                  client.query(string,(err,res5)=>{
                    if(!err){
                      dic["data5"]=res5.rows;
                      res1.send(dic);
                    } else{
                      dic["data5"]="error";
                    }
                  })
                } else{
                  dic["data4"]="error";
                }
              })
            } else{
              dic["data3"]="error";
            }
          });
        } else{
          dic["data2"]="error";
        }
      });
      // console.log(res.rows);
      // res1.send(dic);
    } else{
      dic["data1"]="error";
    }
  });
});
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.post('/venue/add',function(req,res1){
  // console.log(req.body);
  var body = req.body;
  // var cap=parseInt(body.capacity);
  var string=`insert into venue (venue_name,city_name,country_name,capacity) values ('${body.venue_name}','${body.city_name}','${body.country_name}',${body.capacity})`;
  // console.log(string);
  // string="insert into venue (venue_name,city_name,country_name,capacity) values ('yo1','to3','yo2',10000)";
  client.query(string,(err,res)=>{
    if(!err){
      // console.log(res.rows);
      res1.send({result:"success"});
    } else{
      // console.log(err);
      res1.send({result:"error"});
    }
  })
});

app.post('/question/add',function(req,res1){
  // console.log(req.body);
  var body = req.body;
  var exp_diff=parseInt(body.Expected_Difficulty);
  var exp_solve_time = parseInt(body.Expected_solve_time);
  var stt = body.Sub_topics;
  lis = stt.split(",");
  var n = lis.length;
  var string = `select Distinct(t_id) from topic,subtopic_topic where topic.id = subtopic_topic.t_id and (`;
  console.log(global.isTa);
  if(global.isTa){
    console.log("HUY");
    for(var i=0;i<n;i++){
      lis[i]=parseInt(lis[i].trim());
      if(i<n-1) string+=`st_id = ${lis[i]} or `;
      else string+=`st_id = ${lis[i]}`;
    }
    string += `);`;
    console.log(string);
    client.query(string,(err,resta)=>{
      if(!err){
        console.log(resta.rows);
        string = `select Distinct(t_id) from topic_course,TA where TA.s_id = ${taid} and topic_course.c_id = TA.c_id`;
        topiclist = [];
        for(var i=0;i<resta.rows.length;i++){
          topiclist.push(resta.rows[i].t_id);
        }
        client.query(string,(err,rescour)=>{
          if(!err){
            for(var i=0;i<rescour.rows.length;i++){
              if(rescour.rows[i].t_id in topiclist){
                continue;
              } else{
                res1.send({result:"error invalid subtopic"});
              }
            }
          }
        });
      } else{
        console.log(err);
      }
    });
  }
  string = `select count(*) from question`;
  var num_ques=0;
  client.query(string,(err, res) =>{
    if(!err){
      num_ques = parseInt(res.rows[0].count)+1;
      // console.log(res.rows[0].count);
      string = `insert into question (id,question_text,difficulty,time_taken,num_feedbacks) values (${num_ques},'${body.Question}',${exp_diff},${exp_solve_time},1)`;
      console.log(string);
      client.query(string,(err,res2)=>{
        if(!err){
          // console.log("fjdskl");
          string=``;
          for(var i=0;i<n;i++){
            // lis[i]=parseInt(lis[i].trim());
            string+=`insert into ques_subtopic (q_id,st_id) values (${num_ques},${lis[i]});`;
          }
          console.log(string);
          client.query(string,(err,res3)=>{
            if(!err){
              console.log("hurray");
              // console.log(res3);
              var role = "professor";
              var pid = global.partid;
              if(global.isTa){
                role = "ta";
              }
              string = `insert into added_by (q_id,p_id,role) values (${num_ques},${pid},'${role}')`;
              console.log(string);
              client.query(string,(err,res4)=>{
                if(!err){
                  console.log("hurray");
                  res1.send({result:"success"});
                } else{
                  console.log(err);
                  res1.send({result:"error"});
                }
              });
            } else{
              console.log("jj");
              console.log(err);
              res1.send({result:"error"});
            }
          });
        } else{
          res1.send({result:"error"});
        }
      });
    } else{
      res1.send("error");
    }
  });

  // var string=`insert into venue (question_text,difficulty,time_taken,num_feedbacks) values ('${body.Question}','${body.Expected_Difficulty}','${body.Expected_solve_time}',1)`;
  // // console.log(string);
  // // string="insert into venue (venue_name,city_name,country_name,capacity) values ('yo1','to3','yo2',10000)";
  // client.query(string,(err,res)=>{
  //   if(!err){
  //     // console.log(res.rows);
  //     res1.send({result:"success"});
  //   } else{
  //     // console.log(err);
  //     res1.send({result:"error"});
  //   }
  // })
  // console.log(req.body);
});

app.get('/getpaper/:difficulty/:duration/:marks/:topics/:c_id',function(req,res1){
  console.log("hh");
  console.log(req.params);
  var difficulty = parseFloat(req.params.difficulty);
  var duration = parseInt(req.params.duration);
  var marks = parseInt(req.params.marks);
  var cid = parseInt(req.params.c_id);
  var tops = req.params.topics;
  var topics = tops.split(",");
  var topics_str = "";
  for(var i=0;i<topics.length;i++) {
    topics[i]=Number(topics[i].trim());
    if(isNaN(topics[i])) res1.send("Wrong sub-topics");
    topics_str = topics_str + String(topics[i])+",";
  }
  topics_str = "("+topics_str+"-10)"
  // var lis = topics.split(",");
  var topics_str = "("+topics+")"
  var string = `select DISTINCT Q.id, Q.difficulty, Q.time_taken, Q.question_text from Question as Q, ques_subtopic as QS, subtopic_topic as ST, topic_course as TC where QS.q_id=Q.id and ST.st_id=QS.st_id and ST.t_id in ${topics_str} and TC.c_id=${cid} and ST.t_id=TC.t_id limit 20`;
  console.log(string);
  console.log(topics);
  client.query(string,(err, res) =>{
    if(!err){
      console.log(res.rows);
      var time=[];
      var diff=[];
      var qids=[];
      var qtexts=[];
      for(var a=0;a<res.rows.length;a++){
        time.push(res.rows[a].time_taken);
        diff.push(res.rows[a].difficulty);
        qids.push(res.rows[a].id);
        qtexts.push(res.rows[a].question_text);
      }
      console.log(time);
      console.log(diff);
      console.log(qids);
      var lis = [];
      var flag = 0;
      for(var i=-1;i<=1;i+=1){
        for(var j=-3;j<=3;j+=1){
          global.sum = duration+j;
          var req_diff = difficulty+i;
          global.queslist = [];
          recurse(time,0,0,[]);
          // console.log(global.queslist);
          for(var ii = 0;ii<global.queslist.length;ii++){
            lis = global.queslist[ii];
            var sumdiff = 0.0;
            // console.log(lis);
            for(var jj = 0 ; jj < lis.length;jj++){
              var ind = lis[jj];
              sumdiff += diff[ind];
            }
            // console.log(sumdiff);
            if(sumdiff==lis.length*req_diff && lis.length!=0){
              flag=1;
              var allot_marks = [];
              var questext = [];
              var sum = 0;
              for(var iii = 0 ;iii<lis.length-1;iii++){
                var temp_marks = parseInt(time[lis[iii]]*marks/(global.sum));
                allot_marks.push(temp_marks);
                sum += temp_marks;
                questext.push(qtexts[lis[iii]]);
              }
              questext.push(qtexts[lis[lis.length-1]]);
              allot_marks.push(marks-sum);
              console.log(lis);
              for(var i=0;i<lis.length;i++) lis[i]=qids[lis[i]];
              console.log(allot_marks);
              console.log("ufffffffff");
              string = `select count(*) from exams`;
              client.query(string,(err,res10)=>{
                if(!err){
                  var cnt = parseInt(res10.rows[0].count);
                  string = `insert into exams (id,pattern,question_count,difficulty,duration,marks) values (${cnt+1},'Objective',${lis.length},${req_diff},${duration},${marks})`;
                  client.query(string,(err,res11)=>{
                    if(!err){
                      string = `insert into exam_course (e_id,c_id) values (${cnt+1},${cid})`;
                      client.query(string,(err,res12)=>{
                        if(!err){
                          console.log("yayayyy");
                        } else{
                          console.log("sadgeeee");
                        }
                      });
                    } else{
                      console.log("sadge");
                    }
                  });
                } else{
                  console.log(err);
                }
              });
              res1.status(200).json({"ques_lis":lis,"allot_marks":allot_marks,"qtexts":questext});
              break;
            }
          }
          
        }
      }
      // console.log("for loop done");
      // res1.send(res.rows);
    } else{
      console.log(err);
      // res1.status(200).json({"ques_lis":[]});
    }
    if(flag==false){
      res1.status(200).json({"ques_lis":[]});
    }
  });
  // var n = lis.length;
  // var time = [10,10,10,20,20,20,30,30,30];
  // var diff = [1,2,3,3,4,2,2,3,4];

}
);

app.get('/course/:c_id/analytics', (req,res1) => {
  var cid = req.params.c_id;
  var string = `select 
  sum((cpi>=5 and cpi<6)::int) as five,
  sum((cpi>=6 and cpi<7)::int) as six,
  sum((cpi>7 and cpi<8)::int) as seven,
  sum((cpi>8 and cpi<9)::int) as eight,
  sum((cpi>9 and cpi<=10)::int) as nine
  from student,student_course where c_id = ${cid} and student.id=student_course.s_id;`;
  dic={};
  client.query(string,(err, res) =>{
    if(!err){
      // res1.status(200).json({"hist":res.rows});
      dic["cpi-distri"]=res.rows;
      string = `select department,count(*) from student,student_course 
      where c_id = ${cid} and id=student_course.s_id group by department;`;
      client.query(string,(err, res) =>{
        if(!err){
          dic["dept-count"]=res.rows;
          if(!err){
            string = `select year,count(*) from student,student_course 
            where c_id = ${cid} and id=student_course.s_id group by year;`;
            client.query(string,(err, res) =>{
              if(!err){
                dic["total-students"]=res.rows;
                if(!err){
                string=`select topic_course.t_id,count(*) as ques_cnt from topic_course,subtopic_topic,ques_subtopic
                where topic_course.c_id = ${cid} and topic_course.t_id=subtopic_topic.t_id and subtopic_topic.st_id=ques_subtopic.st_id 
                group by topic_course.t_id;`;
                client.query(string,(err, res) =>{
                  dic["ques-per-topic"]=res.rows;
                  res1.status(200).send(dic);                
                });
                }

              } else{
                res1.send("error");
              }
            }); 
          }
        }
        else{
          res1.send("error");
        }
      });
    } else{
      res1.send("error");
    }
  });
});

app.post('/feedback/add/:qid/:sid',function(req,res1){
  var body = req.body;
  var qid = req.params.qid;
  var sid = req.params.sid;
  var diff = body["Difficulty_faced"];
  var time = body["Time_taken"];
  // console.log(body["solved"]);
  // console.log(sid);
  // var diff = bod
  var flag = 0;
  if(body["solved"]=""){
    flag = 0;
  } else{
    flag = 1;
  }
  var string = `select count(*) from feedback`;
  client.query(string,(err,res)=>{
    if(!err){
      var cnt = parseInt(res.rows[0].count);
      string = `insert into feedback (feedback_id,s_id,q_id,time_taken,difficulty,solved) values (${cnt+1},${sid},${qid},${diff},${time},${flag})`;
      // console.log(string);
      client.query(string,(err,res)=>{
        if(!err){
          res1.status(200).send("success");
        } else{
          res1.status(200).send("error");
        }
      });
    } else{
      res1.status(200).send("error");
    }
  });
});



app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});