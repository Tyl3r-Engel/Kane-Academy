import axios from 'axios';

export default async function requestProfile(mentor_id, cb) {
  const { data } = await axios.get(`/api/getReviews/${mentor_id}`);
  cb(data);
}
