export default function(doc) {
  // Pretty URLs for known types
  if (doc.type === 'project') return "/projects/" + doc.uid;
  // Fallback for other types, in case new custom types get created
  return "/doc/" + doc.id;
}
