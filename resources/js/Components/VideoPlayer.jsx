import React from 'react';
import ReactPlayer from 'react-player/youtube';
import getYoutubeId from '@/Utils/GetYoutubeId';

export default function VideoPlayer({ url }) {
  return (
    <ReactPlayer 
      controls={true} 
      url={url} 
      light={
        <img src={`https://i.ytimg.com/vi/${getYoutubeId(url)}/maxresdefault.jpg`} alt='Thumbnail'/>
      }
    />
  );
}