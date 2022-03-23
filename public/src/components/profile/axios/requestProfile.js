import axios from 'axios';

export default async function requestProfile(mentor_id, cb) {
  const { data } = await axios.get(`/api/getProfile/${mentor_id}`);
  console.log('mentor_id', mentor_id, 'axios data', data)
  cb(data);
}

