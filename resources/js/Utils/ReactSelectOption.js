export default function convertOptions(options) {
  return options.map((item) => ({ value: item.id, label: item.name }))
}