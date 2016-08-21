export default function getIdFromURL (url) {
  return Number(url.split('/').filter((x) => x).pop());
}
