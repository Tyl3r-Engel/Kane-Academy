const { pool } = require('../pool');

const addMentorSkills = (mentor_id, skill_id, pricing, cb) => {
  const queryString = `INSERT INTO mentor_skills (mentor_id, skill_id, pricing)
  VALUES ($1, $2, $3)`;

  pool.query(queryString, [mentor_id, skill_id, pricing], cb);
}

const initMentorSkills = (mentor_id, skill_id, cb) => {
  const queryString = `INSERT INTO mentor_skills(mentor_id, skill_id, pricing) VALUES($1, $2, null)`;

  for (var i = 0; i < 5; i++) {
    pool.query(queryString, [mentor_id, skill_id])
  }
  cb('hey')
}

const updateMentorSkills = (mentorObj, cb) => {
  const queryString = `UPDATE mentor_skills SET skill_id = $2, pricing = $3 WHERE id = $1`

  pool.query(queryString, [mentorObj.id, mentorObj.skill_id, mentorObj.pricing], cb)
}

const getMentorSkills = (cb) => {
  const queryString = `
  SELECT mentor_skills.id AS mentor_skills_id, mentor_skills.mentor_id, mentor_skills.skill_id, users.first_name, users.last_name, users.mentor, skills.name, skills.category, skills.description, mentor_profiles.photo
  FROM mentor_skills LEFT JOIN users ON mentor_skills.mentor_id = users.id LEFT JOIN skills ON skills.id = mentor_skills.skill_id LEFT JOIN mentor_profiles ON mentor_profiles.mentor_id = mentor_skills.mentor_id WHERE users.mentor = true ORDER BY skill_id desc;
  `
  pool.query(queryString, cb)
}

module.exports = {
  addMentorSkills, initMentorSkills, updateMentorSkills, getMentorSkills
};
