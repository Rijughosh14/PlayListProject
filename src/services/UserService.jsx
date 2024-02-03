// creating and opening the indexDB
export const openDB=()=>{
    return new Promise((resolve,reject)=>{
        const request=indexedDB.open('MusicPlaylist',1);

        request.onupgradeneeded=(event)=>{
            const db=event.target.result;
            const playliststore=db.createObjectStore('playlist',{
                keyPath:'id',
                autoIncrement:true
            });
           // playliststore.createIndex("MusicTitle","Title",{unique:false});
           playliststore.createIndex("MusicFile","File",{unique:false});

            const currentmusicstore=db.createObjectStore('current',{
                keyPath:'id',
                autoIncrement:true
            });

            currentmusicstore.createIndex("CurrentMusicFile",'CurrentMusic',{unique:false});

        }

        request.onsuccess=(event)=>{
            const db=event.target.result
            resolve(db)
        }

        request.onerror=(event)=>{
            reject(new Error("error opening database"))
        }
    })
}

//adding a music file to db
export const AddMusicToDB=(db,data)=>{
    return new Promise((resolve,reject)=>{
        const transaction=db.transaction(['playlist'],'readwrite');
        const objectStore=transaction.objectStore('playlist');

        const request=objectStore.add(data);

        request.onsuccess=(event)=>{
            const addedKey = event.target.result;
            const getRequest = objectStore.get(addedKey);

            getRequest.onsuccess = (event) => {
                const addedData = event.target.result;
                resolve(addedData);
            };

            getRequest.onerror = () => {
                reject(new Error('Error retrieving added data'));
            };
        };

        request.onerror = () => {
            reject(new Error('Data addition failed'));
        };

        transaction.onerror=()=>{
            reject(new Error('transaction failed'))
        };

        transaction.oncomplete=()=>{
            resolve()
        };
    })
}

//getting all stored music from db
export const GetPlaylist=(db)=>{
    return new Promise((resolve,reject)=>{
        const transaction=db.transaction(['playlist'],'readonly')

        const objectstore=transaction.objectStore('playlist');
        const result=objectstore.getAll();

        result.onsuccess=(event)=>{
            const data=event.target.result;
            resolve(data)
        }

        result.onerror=()=>{
            reject(new Error('retrieval failed'))
        }
    })
}

//getting a stored music from db
export const GetMusic=(db,id)=>{
    return new Promise((resolve,reject)=>{
        const transaction=db.transaction(['playlist'],'readonly')
        const objectstore=transaction.objectStore('playlist')

        const request=objectstore.get(id)

        request.onsuccess=(event)=>{
            const data=event.target.result;
            resolve(data)
        }

        request.onerror=()=>{
            reject(new Error('retrieval failed'))
        }
    })
}

//removing music from db
export const RemoveMusicFromDB=(db,id)=>{
    return new Promise((resolve,reject)=>{
        const transaction=db.transaction(['playlist'],'readwrite');
        const objectStore=transaction.objectStore('playlist');

        const request=objectStore.delete(id);

        request.onsuccess=(event)=>{
            const getRequest = objectStore.getAll();

            getRequest.onsuccess = (event) => {
                const Data = event.target.result;
                resolve(Data);
            };

            getRequest.onerror = () => {
                reject(new Error('Error retrieving data'));
            };
        };

        request.onerror = () => {
            reject(new Error('Data removal failed'));
        };

        transaction.onerror=()=>{
            reject(new Error('transaction failed'))
        };

        transaction.oncomplete=()=>{
            resolve()
        };
    })
}