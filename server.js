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
  user : "sahil32",
  port : 5432,
  password : "rajabose69",
  database : "proj"
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




const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );



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
                          string = ``;
                          for(var i = 0 ; i<lis.length;i++){
                            string = string + `insert into ques_exam (q_id,e_id) values (${lis[i]},${cnt+1});`;
                          }
                          client.query(string,(err,res13)=>{
                            if(!err){
                              console.log("done");
                            } else{
                              console.log(err);
                            }
                          });
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

app.post('/feedback/add/:qid/:sid',function(req,res1){
  var body = req.body;
  var qid = req.params.qid;
  var sid = req.params.sid;
  var diff = body["Difficulty_faced"];
  var time = body["Time_taken"];
  console.log(body["solved"]);
  // console.log(sid);
  // var diff = bod
  var flag = 0;
  if(body["solved"]==""){
    flag = 0;
  } else{
    flag = 1;
  }
  var string = `select count(*) from feedback`;
  client.query(string,(err,res)=>{
    if(!err){
      var cnt = parseInt(res.rows[0].count);
      string = `insert into feedback (feedback_id,s_id,q_id,time_taken,difficulty,solved) values (${cnt+1},${sid},${qid},${time},${diff},${flag})`;
      console.log(string);
      client.query(string,(err,res)=>{
        if(!err){
          console.log("success");
          res1.status(200).send("success");
        } else{
          console.log("oops");
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

app.get('/exam_analytics/:eid',function(req,res1){
  // console.log(req.body);
  // var body = req.body;
  var cid = req.params.eid;
  var string=`select question.difficulty,count(question.difficulty) from ques_exam,question where ques_exam.q_id=question.id and e_id = ${cid}
  group by e_id,difficulty;`;
  // console.log(string);
  // string="insert into venue (venue_name,city_name,country_name,capacity) values ('yo1','to3','yo2',10000)";
  dic={};
  client.query(string,(err,res)=>{
    if(!err){
      // console.log(res.rows);
      dic["difficulty"]=res.rows;
      string=`select difficulty,time_taken from question,ques_exam where e_id = ${cid} and question.id = ques_exam.q_id;`;
      client.query(string,(err,res)=>{
        if(!err){
          dic["time"]=res.rows;
          res1.send(dic);
        } else{
          res1.status(200).send("error");
        }
      });
      // res1.send({result:"success"});
    } else{
      // console.log(err);
      res1.send({result:"error"});
    }
  })
});


app.get('/question_analytics/:q_id',function(req,res1){
  // console.log(req.body);
  // var body = req.body;
  var qid = req.params.q_id;
  var string=`select 100*avg(solved) as percent_solve from student_feedback where q_id = ${qid};`;
  // console.log(string);
  // string="insert into venue (venue_name,city_name,country_name,capacity) values ('yo1','to3','yo2',10000)";
  dic={};
  client.query(string,(err,res)=>{
    if(!err){
      console.log(res.rows);
      dic["percent_solve"]=res.rows[0].percent_solve;
      string=`select count(*) as total_students from student_feedback where q_id = ${qid};`;
      client.query(string,(err,res)=>{
        if(!err){
          dic["total_students"]=res.rows[0].total_students;
          string = `select
                    sum((cpi>=5 and cpi<6)::int) as five,
                    sum((cpi>=6 and cpi<7)::int) as six,
                    sum((cpi>7 and cpi<8)::int) as seven,
                    sum((cpi>8 and cpi<9)::int) as eight,
                    sum((cpi>9 and cpi<=10)::int) as nine
                    from student_feedback where solved = 1 and q_id = ${qid};`;
          client.query(string,(err,res)=>{
            if(!err){
              dic["cpi_solved"]=res.rows;
              string = `select department,count(*) from student_feedback where solved = '1' and q_id = ${qid} group by department;`;
              client.query(string,(err,res)=>{
                if(!err){
                  dic["dept_solved"]=res.rows;
                  res1.status(200).send(dic);
                } else{
                  res1.status(200).send("error");
                }
              });
            }else{
              res1.status(200).send("error");
            } 
          });
        } else{
          res1.send({result:"error"});
        }
      })
      // res1.send({result:"success"});
    } else{
      // console.log(err);
      res1.send({result:"error"});
    }
  })
});