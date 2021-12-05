export default function(doc) {
  if (doc.type === 'project') return "/projects/" + doc.uid

  // Fallback for other types, in case new custom types get created
  return "/doc/" + doc.id
}
