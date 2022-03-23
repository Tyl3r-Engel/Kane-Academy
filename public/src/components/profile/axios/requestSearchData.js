import axios from 'axios';

export default async function requestSearchData(cb) {
  const { data } = await axios.get(`/api/searchData`)
  try {
    const { data } = await axios.get(`/api/searchData`)
  } catch(e) {
    console.log(e);
    window.location('/login')
  }
  cb(data);
}
