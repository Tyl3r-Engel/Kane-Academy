export default function date(time) {
  const timestamp = new Date(time);
  const d = JSON.stringify(timestamp.getDate());
  const i = timestamp.getMonth();
  const y = JSON.stringify(timestamp.getFullYear());
  const m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const stringDate = `${m[i]} ${d}, ${y}`;
  return stringDate;
}