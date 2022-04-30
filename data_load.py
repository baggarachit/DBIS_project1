import csv
import random
import string
departments = ["Aerospace Engineering","Biosciences and Bioengineering","Chemical Engineering","Chemistry","Civil Engineering","Computer Science & Engineering","Earth Sciences","Electrical Engineering","Energy Science and Engineering","Environmental Science and Engineering (ESED)","Humanities & Social Sciences","Mathematics","Mechanical Engineering","Metallurgical Engineering & Materials Science","Physics"]
num_dept = len(departments)
programs = ["B.Tech","M.Tech"]
names=[]
with open("names.csv","r") as f :
	reader = csv.reader(f)
	for row in reader :
		names.append(row[1])

n = len(names)

prob_prof = 0.05
num_prof = 100
prob_ta = 0.2
num_stud = int(1/prob_prof)*num_prof
num_participants = num_stud+num_prof
num_ta = int(1/prob_ta)*num_stud

participants_table = []

participant_id = 1

for i in range(num_participants) :
	index = random.randint(0,n-1)
	pass_len = random.randint(7,10)
	password = ''.join(random.choices(string.ascii_uppercase + string.digits, k = pass_len))
	p = random.random()
	role = "student"
	if p <= prob_prof :
		role = "professor"
	participants_table.append([participant_id,names[index],password,role])
	participant_id+=1

# print(participants_table)
student_table = []
prof_table=[]
# student_id = 1
# prof_id = 1
for i in range(num_participants) :
	if participants_table[i][3]=="student" :
		index = random.randint(0,num_dept-1)
		dept = departments[index]
		index = random.randint(0,1)
		program = programs[index]
		year = random.randint(1,4)
		cpi = 6 + 4*random.gauss(0,0.5)
		if(cpi>=10) :
			cpi=10
		if(cpi<=5) :
			cpi = 5
		student_table.append([participants_table[i][0],participants_table[i][1],program,dept,year,cpi])
		# student_id+=1
	else :
		index = random.randint(0,num_dept-1)
		dept = departments[index]
		prof_table.append([participants_table[i][0],participants_table[i][1],dept])
		# prof_id+=1

courses_table=[]
with open("courses.csv","r") as f :
	reader = csv.reader(f)
	cnt=1
	for row in reader :
		row[0]=cnt
		cnt+=1
		courses_table.append(row)

question_id = 1
num_questions = 750
question_table = []
for i in range(num_questions) :
	question_text = "What is "
	difficulty = random.randint(1,5)
	solve_time = difficulty*5+int(random.gauss(0,5))
	num1 = random.randint(1,10000000);
	num2 = random.randint(1,10000000);
	question_text += str(num1)+" + "+str(num2)+" ?"
	question_table.append([question_id,question_text,difficulty,solve_time,1])
	question_id+=1

num_topic = 20
num_subtopic = 60

topic_table = []
subtopic_table = []

for i in range(num_topic) :
	topic_table.append([i+1])

for i in range(num_subtopic) :
	subtopic_table.append([i+1])

exams_table = []
num_exams = 100

for i in range(num_exams) :
	pattern = 'Objective'
	p = random.random()
	if p<=0.5 :
		pattern = 'Subjective'
	question_count = random.randint(5,10)
	difficulty = random.randint(1,5)
	duration = difficulty*5+int(random.gauss(0,5))
	marks = random.randint(2,3)*50
	exams_table.append([i+1,pattern,question_count,difficulty,duration,marks])

student_course_table = []

for i in range(len(courses_table)) :
	student = random.randint(86,94)
	sample = random.sample(range(1,len(student_table)+1),student)
	for j in range(student) :
		ind = sample[j]
		ind  = student_table[ind-1][0]
		student_course_table.append([ind,i+1])

ques_exam_table = []

for i in range(num_exams) :
	ques = exams_table[i][2]
	sample = random.sample(range(1,num_questions+1),ques)
	for j in range(ques) :
		ind = sample[j]
		ques_exam_table.append([ind,i+1])

exam_course_table = []

for i in range(len(courses_table)) :
	exam = random.randint(5,7)
	sample = random.sample(range(1,num_exams+1),exam)
	for j in range(exam) :
		ind = sample[j]
		exam_course_table.append([ind,i+1])

feedback_table = []
feedback_id = 1
for i in range(num_questions) :
	num_stud = random.randint(3,7)
	exam_list = []
	for ele in ques_exam_table :
		if i==ele[0] :
			exam_list.append(ele[1])
	course_list = []
	for ele in exam_list :
		for course in exam_course_table :
			if course[0]==ele :
				course_list.append(course[1])
	student_list = []
	for ele in course_list :
		for student in student_course_table :
			if ele==student[0] :
				student_list.append(student[0])

	student_list = list(set(student_list))
	if len(student_list) < num_stud :
		num_stud = len(student_list)
	sample = random.sample(range(1,len(student_list)+1),num_stud)
	for j in range(num_stud) :
		feedback = random.randint(1,5)
		q_id = i+1
		s_id = sample[j]
		s_id = student_list[s_id-1]
		p = random.random()
		difficulty = random.randint(1,5)
		solved = 0 
		time_taken = difficulty*5+int(random.gauss(0,5))
		if p <= 0.5 :
			solved = 1
		feedback_table.append([feedback_id,s_id,q_id,time_taken,difficulty,solved])
		feedback_id += 1

ques_subtopic_table = []

for i in range(num_questions) :
	subtopic = random.randint(2,4)
	sample = random.sample(range(1,num_subtopic+1),subtopic)
	for j in range(subtopic) :
		ind = sample[j]
		ques_subtopic_table.append([i+1,ind])

topic_subtopic_table = []
for i in range(num_topic) :
	sub = random.randint(5,7)
	sample = random.sample(range(1,num_subtopic+1),sub)
	for j in range(sub) :
		ind = sample[j]
		topic_subtopic_table.append([ind,i+1])

for i in range(len(subtopic_table)) :
	subt = subtopic_table[i][0]
	flag = False
	for j in range(len(topic_subtopic_table)) :
		if(subt==topic_subtopic_table[j][0]) :
			flag=True
			break
	if flag==False :
		ind = random.randint(1,len(topic_table))
		top = topic_table[ind-1][0]
		topic_subtopic_table.append([subt,top])

topic_course_table = []

for i in range(len(courses_table)) :
	topic = random.randint(2,6)
	sample = random.sample(range(1,num_topic+1),topic)
	for j in range(topic) :
		ind = sample[j]
		topic_course_table.append([ind,i+1])


prof_course_table = []

for i in range(len(courses_table)) :
	prof = random.randint(1,len(prof_table))
	prof = prof_table[prof-1][0]
	prof_course_table.append([prof,i+1])

ta_course_table = []
for i in range(len(courses_table)) :
	ta = random.randint(1,3)
	sample = random.sample(range(1,len(student_table)+1),ta)
	for  j in range(ta) :
		ind  = sample[j]
		ind = student_table[ind-1][0]
		ta_course_table.append([ind,i+1])

added_by_table = []
for i in range(num_questions) :
	ind = random.randint(1,len(prof_table))
	ind = prof_table[ind-1][0]
	added_by_table.append([i+1,ind,"professor"])

with open("load_data.sql","w") as f :
	for i in range(len(participants_table)) :
		line = "INSERT INTO Participant VALUES "+str(tuple(participants_table[i]))+";\n"
		f.write(line)
	for i in range(len(student_table)) :
		line = "INSERT INTO Student VALUES "+str(tuple(student_table[i]))+";\n"
		f.write(line)
	for i in range(len(prof_table)) :
		line = "INSERT INTO Professor VALUES "+str(tuple(prof_table[i]))+";\n"
		f.write(line)
	for i in range(len(courses_table)) :
		line = "INSERT INTO Courses VALUES "+str(tuple(courses_table[i]))+";\n"
		f.write(line)
	for i in range(len(question_table)) :
		line = "INSERT INTO Question VALUES "+str(tuple(question_table[i]))+";\n"
		f.write(line)
	for i in range(len(topic_table)) :
		line = "INSERT INTO Topic VALUES ("+str(topic_table[i][0])+") ;\n"
		f.write(line)
	for i in range(len(subtopic_table)) :
		line = "INSERT INTO SubTopic VALUES ("+str(subtopic_table[i][0])+") ;\n"
		f.write(line)
	for i in range(len(exams_table)) :
		line = "INSERT INTO Exams VALUES "+str(tuple(exams_table[i]))+";\n"
		f.write(line)
	for i in range(len(feedback_table)) :
		line = "INSERT INTO Feedback VALUES "+str(tuple(feedback_table[i]))+";\n"
		f.write(line)
	for i in range(len(ques_subtopic_table)) :
		line = "INSERT INTO ques_subtopic VALUES "+str(tuple(ques_subtopic_table[i]))+";\n"
		f.write(line)
	for i in range(len(topic_subtopic_table)) :
		line = "INSERT INTO subtopic_topic VALUES "+str(tuple(topic_subtopic_table[i]))+";\n"
		f.write(line)
	for i in range(len(topic_course_table)) :
		line = "INSERT INTO topic_course VALUES "+str(tuple(topic_course_table[i]))+";\n"
		f.write(line)
	for i in range(len(student_course_table)) :
		line = "INSERT INTO student_course VALUES "+str(tuple(student_course_table[i]))+";\n"
		f.write(line)
	for i in range(len(prof_course_table)) :
		line = "INSERT INTO prof_course VALUES "+str(tuple(prof_course_table[i]))+";\n"
		f.write(line)
	for i in range(len(ta_course_table)) :
		line = "INSERT INTO TA VALUES "+str(tuple(ta_course_table[i]))+";\n"
		f.write(line)
	for i in range(len(ques_exam_table)) :
		line = "INSERT INTO ques_exam VALUES "+str(tuple(ques_exam_table[i]))+";\n"
		f.write(line)
	for i in range(len(exam_course_table)) :
		line = "INSERT INTO exam_course VALUES "+str(tuple(exam_course_table[i]))+";\n"
		f.write(line)
	for i in range(len(added_by_table)) :
		line = "INSERT INTO added_by VALUES "+str(tuple(added_by_table[i]))+";\n"
		f.write(line)

# uniqlines = set(open('load_data.sql').readlines())
# with open('load_data.sql','w') as f :
# 	f.writelines(uniqlines)