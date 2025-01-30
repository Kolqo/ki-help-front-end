import React from 'react';

export default function Tgs(props) {
  return (
    <tgs-player
      src={props.src}
      loop={props.isLoop}
      autoplay={props.isAutoplay}
      hover
      intermission="1000"
    />
  );
};