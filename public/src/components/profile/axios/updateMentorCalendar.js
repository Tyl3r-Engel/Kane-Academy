import axios from 'axios';

export default async function updateMentorCalendar(id, calUrl, cb) {
  const { data } = await axios.put(`/api/addMentorCalendar/${id}`, {id, calUrl});
  cb(data);
}