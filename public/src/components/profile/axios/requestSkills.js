import axios from 'axios';

export default async function requestSkills(cb) {
  const { data } = await axios.get(`/api/getSkills`);
  cb(data);
}
