import axios from 'axios';

export default async function updateMentorProfile(id, about, cb) {
  const { data } = await axios.put(`/api/updateMentorProfile/`, {id, about});
  cb(data);
}