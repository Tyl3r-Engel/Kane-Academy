import axios from 'axios';

export default async function requestFirstName(id, cb) {
  const { data } = await axios.get(`/api/getFirstName/${id}`);
  cb(data);
}