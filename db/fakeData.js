const { faker } = require('@faker-js/faker');
const { signup } = require('./controllers/signup.js')
const { messages } = require('./controllers/messages.js')
const { sessions } = require('./controllers/sessions.js')
const { appointments } = require('./controllers/appointments.js')
const { addMentorProfile } = require('./controllers/mentorProfiles.js')
const { addSkills } = require('./controllers/skills.js')
const { addMentorSkills } = require('./controllers/mentorSkills.js')
const { addReview } = require('./controllers/reviews.js')

async function generateData() {
  await fakeSkills()
  await fakeMentor()
  await fakeUser()
  await fakeMessages()
  // await fakeSessions()
  await fakeAppointments()
  await fakeMentorProfile()
  await fakeMentorSkills()
  await fakeReviews()
}

async function fakeMentor() {
  // Generates ten mentors as the first ten rows
  for (var i = 0; i < 10; i++) {
    let mentor = true
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email();
    let password = faker.lorem.word();
    signup(mentor, firstName, lastName, email, password, (err, result) => {
      if (err) {
        console.log('Error in fakeMentor', err)
      }
    })
  }
}

async function fakeUser() {
  // Generates twenty students starting at id 11
  for (var i = 0; i < 20; i++) {
    let mentor = false
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email();
    let password = faker.lorem.word();
    signup(mentor, firstName, lastName, email, password, (err, result) => {
      if (err) {
        console.log('Error in fakeUser', err)
      }
    })
  }
}

async function fakeMessages() {
  for (var i = 1; i < 11; i++) {
    for (var j = 0; j < 10; j++) {
      let sender_id = i + 10
      let recipient_id = i
      body = faker.lorem.sentence()
      time = new Date()
      messages(sender_id, recipient_id, body, time, (err, result) => {
        if (err) {
          console.log(err)
        }
      })
    }
  }
}

// async function fakeSessions() {

// }

async function fakeAppointments() {
  for (var i = 1; i < 11; i++) {
    for (var j = 0; j < 5; j++) {
      let mentor_id = i
      let learner_id = i + 10
      let start_time = new Date()
      let end_time = new Date()
      appointments(mentor_id, learner_id, start_time, end_time, (err, results) => {
        if (err) {
          console.log(err)
        }
      })
    }
  }
}

async function fakeMentorProfile() {
  // Generates ten fake mentor pages
  for (var i = 1; i < 11; i++) {
    let mentor_id = i
    let about = faker.lorem.paragraph();
    let calendly = ''
    let photo = faker.image.avatar()
    addMentorProfile(mentor_id, about, calendly, photo, (err, result) => {
      if (err) {
        console.log('Error in fakeMentorProfile', err)
      }
    })
  }
}

async function fakeSkills() {
  // Generates thirty fake skills
  for (var i = 0; i < 30; i++) {
    let name = faker.lorem.word()
    let category = faker.lorem.word()
    let description = faker.lorem.sentence()
    addSkills(name, category, description, (err, result) => {
      if (err) {
        console.log('Error in fakeSkills', err)
      }
    })
  }
}

async function fakeMentorSkills() {
  // Generates fake skills for ten mentors
  for (var i = 1; i < 11; i++) {
    for (var j = 0; j < 5; j++) {
      let mentor_id = i
      let skill_id = Math.floor(Math.random() * 31)
      let pricing = faker.commerce.price()
      addMentorSkills(mentor_id, skill_id, pricing, (err, result) => {
        if (err) {
          console.log('Error in fakeMentorSkills', err)
        } else {
          console.log('success with', mentor_id, skill_id, pricing)
        }
      })
    }
  }
}

async function fakeReviews() {
  // Generates one fake review for ten mentors
  for (var i = 1; i < 11; i++) {
    for (var j = 0; j < 10; j++) {
      let mentor_id = i
      let learner_id = Math.floor(Math.random() * (30 - 10) + 10)
      let skill_id = Math.floor(Math.random() * 30)
      let rating = Math.floor(Math.random() * (5 - 1 + 1) + 1)
      let body = faker.lorem.paragraph()
      let time = new Date();
      addReview(mentor_id, learner_id, skill_id, rating, body, time, (err, result) => {
        if (err) {
          console.log('Error in fakeReviews', err)
        }
      })
    }
  }
}

module.exports = {
  generateData,
};