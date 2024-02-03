import React from 'react'

const OptionComponent = ({audioFile,setaudioFile,addMusictoDb}) => {

  const RemoveCurrentMusic=()=>{
    setaudioFile(null)
    localStorage.removeItem('audioPosition')
    localStorage.removeItem('currentMusic')
  }

  return (
    audioFile&&<div className='flex flex-row justify-end gap-4'>
        <button 
        className='h-fit w-fit px-4 py-2 font-serif rounded-md bg-red-400 hover:text-white'
        onClick={RemoveCurrentMusic}
        >
            CANCEL
        </button>
        <button 
        className='h-fit w-fit px-4 py-2 font-serif rounded-md bg-blue-400 hover:text-white'
        onClick={addMusictoDb}
        >
            UPLOAD
        </button>
    </div>
  )
}

export default OptionComponent