import axios from 'axios';

export default async function requestCurrentSession(cb) {
  const { data } = await axios.get(`/api/getSess`);
  cb(data);
}
