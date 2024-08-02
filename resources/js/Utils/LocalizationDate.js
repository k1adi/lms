export default function LocalizationDate(date, lang) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

  if (lang == 'id') {
    return new Date(date).toLocaleDateString('id-ID', options);
  }

  if (lang == 'en') {
    return new Date(date).toLocaleDateString('en-US', options);
  }  
}