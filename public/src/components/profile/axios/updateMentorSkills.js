import axios from 'axios';

export default async function updateMentorSkills(id, skill_id, pricing, cb) {
  const { data } = await axios.put(`/api/updateMentorSkills/`, {id, skill_id, pricing});
  cb(data);
}