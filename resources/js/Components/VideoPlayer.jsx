import React from 'react';
import ReactPlayer from 'react-player/youtube';
import getYoutubeId from '@/Utils/GetYoutubeId';

export default function VideoPlayer({ url }) {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
      <ReactPlayer 
        controls={true}
        width="100%"
        height="auto"
        url={url} 
        light={
          <img src={`https://i.ytimg.com/vi/${getYoutubeId(url)}/maxresdefault.jpg`} alt='Thumbnail'/>
        }
      />
      </div>
    </div>
  );
}