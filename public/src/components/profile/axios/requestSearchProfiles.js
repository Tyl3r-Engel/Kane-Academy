import axios from 'axios';

export default async function requestSearchProfiles(cb) {
  const { data } = await axios.get(`/api/searchProfiles`);
  cb(data);
}
