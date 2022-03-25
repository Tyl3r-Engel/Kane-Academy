import axios from 'axios';

export default async function requestMentorCalendar(mentor_id, cb) {
  const { data } = await axios.get(`/api/getMentorCalendar/${mentor_id}`);
  cb(data);
}

