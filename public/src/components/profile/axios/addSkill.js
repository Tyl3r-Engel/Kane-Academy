import axios from 'axios';

export default async function addSkill(name, cb) {
  const { data } = await axios.post(`/api/addSkill`, {name, category: '', description: ''} );
  cb(data);
}
