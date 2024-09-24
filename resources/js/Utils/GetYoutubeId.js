export default function getYoutubeId(url) {
    const pattern = /(?:youtube\.com\/(?:watch\?v=|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(pattern);
    
    return match ? match[1] : null;
}