import React, { memo } from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';



const UploadedAudio = ({ audioFile, playingnextFile,play }) => {
  const audioRef = useRef(null);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (audioRef.current && audioFile) {
      audioRef.current.src = URL.createObjectURL(audioFile);
    }
  }, [audioFile]);

  useEffect(() => {
    if (audioRef.current && audioFile) {
      const audio = audioRef.current;
      if(play){
        audio.addEventListener('loadeddata',()=>{
          audio.play()
        },{once:true});      }


      // Retrieve the stored position from localStorage
      const storedPosition = localStorage.getItem('audioPosition');
      if (storedPosition) {
        setPosition(parseFloat(storedPosition));
      }

      // Event listener to update position on beforeunload (page reload)
      const handleBeforeUnload = () => {
        localStorage.setItem('audioPosition', audio.currentTime.toString());
      };

      // Attach event listeners
      window.addEventListener('beforeunload', handleBeforeUnload);

      // Detach event listeners on component unmount
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [audioFile, position]);

  useEffect(() => {

    if (audioRef.current && audioFile) {
      const audio = audioRef.current

      const handlenextPlay = async () => {
        const result = await playingnextFile()
        if (result && audio.src) {
          audio.addEventListener('loadeddata',()=>{
            audio.play()
          },{once:true});
        }

      }

      audio.addEventListener('ended', handlenextPlay);
      return () => {
        audio.removeEventListener('ended', handlenextPlay);
      };

    }

  }, [playingnextFile])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = position;
    }
  }, [audioFile]);

  return (
    <div className='w-full h-full flex flex-col'>
      <p className='p-4 m-auto font font-semibold text-lg'>
        Now Playing , {audioFile.name.slice(0, -3)}
      </p>
      <audio controls className='m-auto' ref={audioRef}>
      </audio>
    </div>
  );
};

const MusicPlayer = ({ audioFile, setaudioFile, playingnextFile,play }) => {


  const HandleAudioSelect = (event) => {
    const file = event.target.files[0];
    setaudioFile(file)
  }

  return (
    !audioFile ?
      <div className='flex h-full '>
        <div className='m-auto flex flex-row gap-2 items-center'>
          <label htmlFor="audioFile" className='hover:cursor-pointer px-5 py-4 rounded-md shadow-lg bg-gray-500 hover:px-6 hover:py-5 font-serif text-white hover:text-lg '>
            <input id='audioFile' type="file" hidden accept={"audio/*"} onChange={(event) => HandleAudioSelect(event)} />
            Add
          </label>
          <p className='text-lg '>
            Or Select From The List
          </p>
        </div>
      </div> :
      <UploadedAudio
        audioFile={audioFile}
        playingnextFile={playingnextFile}
        play={play}
      />
  )
}

export default memo(MusicPlayer)