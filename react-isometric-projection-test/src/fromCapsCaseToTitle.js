// Transforms underscore-separated capital case strings into space-separated title-case strings
// For example: 'FOO_BAZ_BAR' => 'Foo Baz Bar'

export default str => {
  const words = str.split('_');
  const titleCaseWords = words.map(w =>
    w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
  )

  return titleCaseWords.join(' ')
};
