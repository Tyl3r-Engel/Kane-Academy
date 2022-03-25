DROP DATABASE ka;
CREATE DATABASE ka;
\c ka;
set work_mem to '50 MB';

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS skills CASCADE;

CREATE EXTENSION pgcrypto;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  mentor BOOLEAN,
  first_name VARCHAR(25) NOT NULL,
  last_name VARCHAR(25) NOT NULL,
  email VARCHAR(40) NOT NULL UNIQUE,
  gid VARCHAR(32) UNIQUE,
  hash VARCHAR(60)
);

CREATE INDEX i ON users(hash);
CREATE INDEX i0 ON users(email);
CREATE INDEX i4 ON users(gid);

DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_id INT NOT NULL,
  recipient_id INT NOT NULL,
  body TEXT,
  time TIMESTAMP,
  CONSTRAINT fk_user_id_1
    FOREIGN KEY(sender_id)
      REFERENCES users(id),
  CONSTRAINT fk_user_id_2
    FOREIGN KEY(recipient_id)
      REFERENCES users(id)
);

CREATE INDEX i1 ON messages(sender_id);
CREATE INDEX i2 ON messages(recipient_id);
CREATE INDEX i3 ON messages(time DESC);

DROP TABLE IF EXISTS sessions;

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  sid VARCHAR(32) UNIQUE,
  expire TIMESTAMP,
  sess VARCHAR(255)
);

CREATE INDEX i5 ON sessions(sid);

DROP TABLE IF EXISTS appointments;

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  mentor_id INT NOT NULL,
  learner_id INT NOT NULL,
  start_time VARCHAR(50),
  end_time VARCHAR(50),
  CONSTRAINT fk_user_id_4
    FOREIGN KEY(mentor_id)
      REFERENCES users(id),
  CONSTRAINT fk_user_id_5
    FOREIGN KEY(learner_id)
      REFERENCES users(id)
);

CREATE INDEX i6 ON appointments(mentor_id);
CREATE INDEX i7 ON appointments(learner_id);
CREATE INDEX i8 ON appointments(start_time DESC);

DROP TABLE IF EXISTS mentor_profiles;

CREATE TABLE mentor_profiles (
  id SERIAL PRIMARY KEY,
  mentor_id INT NOT NULL,
  about TEXT,
  calendly TEXT,
  photo TEXT,
  CONSTRAINT fk_user_id_6
    FOREIGN KEY(mentor_id)
      REFERENCES users(id)
);

CREATE INDEX i9 ON mentor_profiles(mentor_id);

CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  category VARCHAR(50),
  description TEXT
);

CREATE INDEX i10 ON skills(category);
CREATE INDEX i11 ON skills(name);

DROP TABLE IF EXISTS mentor_skills;

CREATE TABLE mentor_skills (
  id SERIAL PRIMARY KEY,
  mentor_id INT NOT NULL,
  skill_id INT NOT NULL,
  pricing VARCHAR(255),
  CONSTRAINT fk_user_id_7
    FOREIGN KEY(mentor_id)
      REFERENCES users(id),
  CONSTRAINT fk_skills_id_1
    FOREIGN KEY(skill_id)
      REFERENCES skills(id)
);

CREATE INDEX i12 ON mentor_skills(mentor_id);
CREATE INDEX i13 ON mentor_skills(skill_id);

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  mentor_id INT NOT NULL,
  learner_id INT NOT NULL,
  skill_id INT NOT NULL,
  rating SMALLINT,
  body TEXT,
  time TIMESTAMP,
  CONSTRAINT fk_user_id_8
    FOREIGN KEY(mentor_id)
      REFERENCES users(id),
  CONSTRAINT fk_user_id_9
    FOREIGN KEY(learner_id)
      REFERENCES users(id)
);

CREATE INDEX i14 ON reviews(mentor_id);
CREATE INDEX i15 ON reviews(learner_id);
CREATE INDEX i16 ON reviews(skill_id);
CREATE INDEX i17 ON reviews(time DESC);


-- Dummy Data for Search Feature --
INSERT INTO skills (name, category, description) VALUES (null, null, null);
INSERT INTO skills (name, category, description) VALUES ('Guitar', 'Instrument', 'Skill lessons on guitar!');
INSERT INTO skills (name, category, description) VALUES ('Baking', 'culinary', 'Skill lessons on baking!');
INSERT INTO skills (name, category, description) VALUES ('Snowboarding', 'Activity', 'Skill lessons on snowboarding!');
INSERT INTO skills (name, category, description) VALUES ('DJ', 'Music', 'Skill lessons on guitar!');
INSERT INTO skills (name, category, description) VALUES ('Skydiving', 'Activity', 'Skill lessons on skydiving!');
INSERT INTO skills (name, category, description) VALUES ('Snorkeling', 'Activity', 'Skill lessons on snorkeling!');
INSERT INTO skills (name, category, description) VALUES ('Biking', 'Activity', 'Skill lessons on Biking!');
INSERT INTO skills (name, category, description) VALUES ('Singing', 'Music', 'Skill lessons on Singing!');
INSERT INTO skills (name, category, description) VALUES ('Gaming', 'Activity', 'Skill lessons on gaming!');
INSERT INTO skills (name, category, description) VALUES ('Meditation', 'Activity', 'Skill lessons on meditation!');
INSERT INTO skills (name, category, description) VALUES ('English', 'Language', 'Master English!');