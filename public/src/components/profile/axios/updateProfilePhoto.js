import axios from 'axios';

export default async function updateProfilePhoto(id, photo, cb) {
  const { data } = await axios.put(`/api/updateMentorPhoto`, {id, photo});
  cb(data);
}

