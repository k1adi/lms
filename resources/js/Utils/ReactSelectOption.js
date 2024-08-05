export default function convertOptions(options, key = 'name') {
  return options.map((item) => ({ 
    value: item.id, 
    label: item[key]
  }));
}