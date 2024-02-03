import React, { memo } from 'react'
import { useState } from 'react'



const ListComponent = ({MusicPlaylist,SettingCurrentMusic,deleteMusic}) => {

  
  const [DeleteButton,SetDeleteButton]=useState(false)
  const [DeleteButtonIndex,SetDeleteButtonIndex]=useState(-1)

  const handlemouseover=(index)=>{
    SetDeleteButton(true)
    SetDeleteButtonIndex(index)
  }

  const handlemouseout=()=>{
    SetDeleteButton(false)
    SetDeleteButtonIndex(-1)
  }

  const handledelete=(event,id)=>{
    event.stopPropagation();
    deleteMusic(id)
  }


  return (
    <div className='flex flex-col h-full '>
      <div className='h-full overflow-y-auto'>
    {
      MusicPlaylist.map((d,index)=>{
        return(
          <div 
          key={index} 
          className='mb-2 hover:cursor-pointer flex flex-row justify-between p-3'
          onClick={()=>SettingCurrentMusic(d.File,d.id)}
          onMouseOver={()=>handlemouseover(index)}
          onMouseOut={handlemouseout}         
          >
            <div>
            <p className='break-words text-xl font-bold text-blue-900'>{index+1+". "}
               {d.File.name.slice(0,-3)}
            </p>
            </div>
            {(DeleteButton&&DeleteButtonIndex===index)&&<div 
            className='h-fit w-fit hover:cursor-pointer'
            onClick={(event)=>handledelete(event,d.id)}
            >
            <i className="fa-solid fa-trash"></i>
            </div>}
          </div>
        )
      })
    }
      </div>
    </div>
  )
}

export default memo(ListComponent)