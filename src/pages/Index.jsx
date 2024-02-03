import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { AddMusicToDB, GetMusic, GetPlaylist, openDB, RemoveMusicFromDB } from '../services/UserService'
import ListComponent from './Components/ListComponent'
import MusicPlayer from './Components/MusicPlayer'
import OptionComponent from './Components/OptionComponent'





const Index = () => {

    const [audioFile, setaudioFile] = useState(null);
    const [audioFileIndex,setaudioFileIndex]=useState(null);
    const [play,Setplay]=useState(false)
    const [DB, SetDB] = useState(null)
    const [MusicPlaylist, SetMusicPlaylist] = useState([])


    // opening the database
    const openindexdb = async () => {
        const db = await openDB()
        // console.log(db)
        SetDB(db)
    }

    //getting the playlist from db
    const getplaylist = async () => {
        if (DB) {
            const result = await GetPlaylist(DB)
            SetMusicPlaylist(result)
        }
    }

    //adding music to the db
    const addMusictoDb = async () => {
        const result = await AddMusicToDB(DB, {
            File: audioFile
        })
        SetMusicPlaylist((prev) => [...prev, result])
        setaudioFile(null)
        localStorage.removeItem('audioPosition')
        localStorage.removeItem('currentMusic')
    }


    //setting currently played music
    const SettingCurrentMusic = (musicfile, d) => {
        setaudioFile(musicfile)
        localStorage.setItem('currentMusic', d.toString());
        setaudioFileIndex(d)
        localStorage.setItem('audioPosition','0')
        Setplay(true)
    }

    const playingnextFile=async()=>{
        const result=await GetMusic(DB,audioFileIndex+1)
        if(result){
            SettingCurrentMusic(result.File,result.id)
            return true
        }
    }

    //deleting a music from playlist
    const deleteMusic=async(id)=>{
        const result=await RemoveMusicFromDB(DB,id)
        SetMusicPlaylist(result)
    }

    useEffect(() => {
        openindexdb()
    }, [])

    useEffect(() => {
        getplaylist()
    }, [DB])

    //this useeffect get stored time
    useEffect(() => {
        const storedMusic = localStorage.getItem('currentMusic');
        if (storedMusic) {
            const getmusic = async () => {
                const result = await GetMusic(DB, parseFloat(storedMusic))
                setaudioFile(result.File)
                setaudioFileIndex(result.id)
            }
            if (DB) {
                getmusic()
            }
        }
    }, [DB])

    return (
        <>
            <div className='container flex bg-gradient-to-br from-blue-200 to-blue-100 mx-auto h-screen rounded-2xl shadow-2xl shadow-black flex-row'>
                <div className='md:w-3/4 md:h-screen   flex flex-col h-fit'>
                    <div className="bg-gray-100 md:rounded-3xl shadow-xl md:w-3/4 md:h-3/4 h-64 m-auto">
                        <MusicPlayer
                            audioFile={audioFile}
                            setaudioFile={setaudioFile}
                            playingnextFile={playingnextFile}
                            play={play}
                        />
                    </div>
                    <div className='md:w-3/4 md:h-10p p-3 m-auto  -mt-3'>
                        <OptionComponent
                            audioFile={audioFile}
                            setaudioFile={setaudioFile}
                            addMusictoDb={addMusictoDb}
                        />
                    </div>
                </div>
                <div className='md:w-1/4 flex mr-4 '>
                    <div className='bg-gray-100
                    px-2
                    py-2
                    text-black rounded-3xl shadow-xl w-full min-h-32 md:h-90p m-auto overflow-y-auto p-4'>
                        <ListComponent
                            MusicPlaylist={MusicPlaylist}
                            SettingCurrentMusic={SettingCurrentMusic}
                            deleteMusic={deleteMusic}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index