import axios from 'axios';

export default async function requestSearchProfiles(cb) {
  try {
    const { data } = await axios.get(`/api/searchProfiles`);
  } catch (e) {
    console.log(e);
    window.location('/login');
  }
  cb(data);
}
