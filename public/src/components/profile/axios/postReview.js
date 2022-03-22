import axios from 'axios';

export default async function postReview(review, cb) {
  const { data } = await axios.post(`/api/addReview`, review );
  cb(data);
}
