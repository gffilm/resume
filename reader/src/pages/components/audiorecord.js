import React, { useState }  from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

export const AudioRecord = (props) => {
  const { onComplete, style } = props;
  const [allowed, setAllowed] = useState(false);

  const recorderControls = useAudioRecorder();

  const buttonStyle = {
      color: "#000",
      backgroundColor: "transparent",
      border: "none",
      fontSize: "1.5em",
      cursor: "pointer"
  }

  let buttonStyleDisabled = Object.assign({}, buttonStyle);
  buttonStyleDisabled['cursor'] = 'not-allowed';
  buttonStyleDisabled['opacity'] = '.5';

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        setAllowed(true);
      })
      .catch(function(err) {
        if (err.name === 'NotAllowedError' || err.name === 'NotFoundError') {
          console.log('Audio Access not granted');
        } else {
          console.log('Audio Access not granted');
          console.log('Audio Access not granted other reason');
        }
      });
  } else {
      console.log('Audio API Not Supported');
  }

 return (
    <>
    {!allowed ? (
      <button style={buttonStyleDisabled} disabled title="Microphone access not enabled">
        <i className="fas fa-microphone-alt-slash"></i>
      </button>
    ) : (
    <div className="custom-audio-recorder" style={style}>
      <div style={{ display: "none" }}>
        <AudioRecorder
          recorderControls={recorderControls}
          onRecordingComplete={onComplete}
        />
      </div>
      {recorderControls.isRecording ? (
        <button style={buttonStyle} onClick={recorderControls.stopRecording}>
          <i className="fas fa-microphone-alt"></i>
          <p style={{fontSize: 'small'}}>Listening...</p>
        </button>
      ) : (
        <button style={buttonStyle} onClick={recorderControls.startRecording}>
          <i className="fas fa-microphone"></i>
        </button>
      )}
      </div>
    )}
    </>
);

};
