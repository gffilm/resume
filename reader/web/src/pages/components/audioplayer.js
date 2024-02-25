import React, { useState, useRef } from 'react';
import settings from "../../services/settings.service";

export const AudioPlayer = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const apiURL = settings.apiURL;
  const audioFile = `${apiURL}/${props.file}`;

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const audioElement = useRef(null);

  const handleLoadedMetadata = () => {}

  const handleCanPlay = () => {
    try {
      audioElement.current.play();
      setIsPlaying(true);
    } catch (e) {
      console.log('Looks like a permission issue...', e);
    }
  }

  return (
    <div>
      <audio
        volume="0.1"
        ref={audioElement}
        src={audioFile}
        onEnded={props.onComplete}
        onCanPlay={handleCanPlay}
        onLoadedMetadata={handleLoadedMetadata}
        autoPlay />
    </div>
  );

}