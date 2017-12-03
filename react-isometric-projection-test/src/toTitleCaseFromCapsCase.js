export default str => {
  const words = str.split('_');
  const capitalizedWords = words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  return capitalizedWords.join(' ');
};