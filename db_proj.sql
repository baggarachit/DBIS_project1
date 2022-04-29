DROP TABLE IF EXISTS Participant CASCADE;
DROP TABLE IF EXISTS Professor CASCADE;
DROP TABLE IF EXISTS Student CASCADE;
DROP TABLE IF EXISTS Courses CASCADE;
DROP TABLE IF EXISTS Question CASCADE;
DROP TABLE IF EXISTS Topic CASCADE;
DROP TABLE IF EXISTS SubTopic CASCADE;
DROP TABLE IF EXISTS Exams CASCADE;
DROP TABLE IF EXISTS Feedback CASCADE;
DROP TABLE IF EXISTS ques_subtopic CASCADE;
DROP TABLE IF EXISTS subtopic_topic CASCADE;
DROP TABLE IF EXISTS topic_course CASCADE;
DROP TABLE IF EXISTS student_course CASCADE;
DROP TABLE IF EXISTS Prof_course CASCADE;
DROP TABLE IF EXISTS TA CASCADE;
DROP TABLE IF EXISTS ques_exam CASCADE;
DROP TABLE IF EXISTS exam_course CASCADE;
DROP TABLE IF EXISTS added_by CASCADE;
DROP TABLE IF EXISTS logs;
-- Drop TRIGGER ques_update;

CREATE TABLE Participant (
    id INT ,
    name TEXT,
    password TEXT,
    role TEXT,
    Primary key(id)
);

CREATE TABLE Professor (
    id INT ,
    name TEXT,
    Department TEXT,
    Primary key(id)
);

CREATE TABLE Student (
    id INT ,
    name TEXT,
    Program TEXT,
    Department TEXT,
    Year INT,
    cpi REAL,
    Primary key(id)
);

CREATE TABLE Courses (
    id INT ,
    name TEXT,
    Department TEXT,
    Primary key(id)
);

CREATE TABLE Question (
    id INT ,
    question_text TEXT,
    difficulty INT CHECK(difficulty>=0 and difficulty<=5),
    time_taken INT DEFAULT 0,
    num_feedbacks INT,
    Primary key(id)
);

CREATE TABLE Topic (
    id INT ,
    Primary key(id)
);

CREATE TABLE SubTopic (
    id INT ,
    Primary key(id)
);

CREATE TABLE Exams (
    id INT ,
    Pattern TEXT CHECK(Pattern='Objective' or Pattern='Subjective'),
    Question_count INT,
    difficulty REAL,
    Duration INT,
    Marks INT,
    Primary key(id)
);

CREATE TABLE Feedback (
    feedback_id INT,
    s_id INT,
    q_id INT,
    time_taken INT,
    difficulty INT,
    solved INT CHECK(solved=0 or solved=1),
    Primary key(s_id,q_id),
    FOREIGN KEY(s_id) references Student on delete set null,
    FOREIGN KEY(q_id) references Question on delete cascade
);

CREATE TABLE ques_subtopic (
    q_id INT,
    st_id INT,
    Primary key(q_id,st_id),
    FOREIGN KEY(q_id) references Question on delete cascade,
    FOREIGN KEY(st_id) references SubTopic on delete cascade
);

CREATE TABLE subtopic_topic (
    st_id INT,
    t_id INT,
    Primary key(st_id,t_id),
    FOREIGN KEY(st_id) references SubTopic on delete cascade,
    FOREIGN KEY(t_id) references Topic on delete cascade
);

CREATE TABLE topic_course (
    t_id INT,
    c_id INT,
    Primary key(t_id,c_id),
    FOREIGN KEY(t_id) references Topic on delete cascade,
    FOREIGN KEY(c_id) references Courses on delete cascade
);

CREATE TABLE student_course (
    s_id INT,
    c_id INT,
    Primary key(s_id,c_id),
    FOREIGN KEY(s_id) references Student on delete cascade,
    FOREIGN KEY(c_id) references Courses on delete cascade
);

CREATE TABLE Prof_course (
    p_id INT,
    c_id INT,
    Primary key(p_id,c_id),
    FOREIGN KEY(p_id) references Professor on delete cascade,
    FOREIGN KEY(c_id) references Courses on delete cascade
);

CREATE TABLE TA(
    s_id INT,
    c_id INT,
    Primary key(s_id,c_id),
    FOREIGN KEY(s_id) references Student on delete cascade,
    FOREIGN KEY(c_id) references Courses on delete cascade
);

CREATE TABLE ques_exam (
    q_id INT,
    e_id INT,
    Primary key(q_id,e_id),
    FOREIGN KEY(q_id) references Question on delete cascade,
    FOREIGN KEY(e_id) references Exams on delete cascade
);

CREATE TABLE exam_course (
    e_id INT,
    c_id INT,
    Primary key(e_id,c_id),
    FOREIGN KEY(e_id) references Exams on delete cascade,
    FOREIGN KEY(c_id) references Courses on delete cascade
);

CREATE TABLE added_by (
    q_id INT,
    p_id INT,
    role TEXT,
    Primary key(q_id,p_id),
    FOREIGN KEY(q_id) references Question on delete cascade,
    FOREIGN KEY(p_id) references Professor on delete cascade
);

CREATE TABLE logs (
    log TEXT,
    log1 TEXT,
    log2 TEXT
);

-- cpi, difficulty , solvetime , fdbck stud , 

CREATE OR REPLACE FUNCTION  ques_update_func() RETURNS TRIGGER AS $ques_update$
BEGIN

    UPDATE Question SET 
        num_feedbacks = (SELECT num_feedbacks+1 FROM Question WHERE id = new.q_id),
        difficulty = (SELECT (difficulty*num_feedbacks + new.difficulty)/(num_feedbacks+1) FROM Question WHERE id = new.q_id),
        time_taken = (SELECT (time_taken*num_feedbacks + new.time_taken)/(num_feedbacks+1) FROM Question WHERE id = new.q_id)
    where ID = new.q_id;
    -- INSERT INTO logs values (new.q_id);
    RETURN NEW;
END;
$ques_update$ LANGUAGE plpgsql;

CREATE TRIGGER ques_update BEFORE INSERT OR UPDATE ON feedback
FOR EACH ROW EXECUTE PROCEDURE ques_update_func();

CREATE VIEW student_feedback as select * from feedback,student;
CREATE VIEW question_addedby as select * from added_by,question where role='TA';