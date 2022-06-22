import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";
import { storage } from "./firestoreInstance";
import { v4 } from "uuid";
import { getFirestore, getDocs, collection, updateDoc, arrayUnion, doc, arrayRemove } from "firebase/firestore";

const db = getFirestore();

const getPodcasts = async () => {
    try {
        let data = null
        const querySnapshot = await getDocs(collection(db, "Podcast"))
        querySnapshot.forEach((doc) => {
            data = doc.data()
            data = data.media
        });
        // console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

const addPodcast = async (imageUpload, audioUpload, podcast) => {

    try {
        const imageRef = ref(storage, `podcasts/images/${imageUpload.name + v4()}`);
        return uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
            return getDownloadURL(snapshot.ref).then(async (Iurl) => {
                const audioRef = ref(storage, `podcasts/audios/${audioUpload.name + v4()}`);
                return uploadBytes(audioRef, audioUpload).then(async (snapshot) => {
                    return getDownloadURL(snapshot.ref).then(async (Aurl) => {
                        var docRef = doc(db, "Podcast", "XQSfeHu86Wh33ElSRIZt")
                        // console.log(docRef)
                        let d = null
                        const querySnapshot = await getDocs(collection(db, "Podcast"))
                        querySnapshot.forEach((doc) => {
                            d = doc.data()
                            d = d.media
                        });
                        var data = {
                            id: d === undefined || d.length === 0  ? 1 : parseInt(d[d.length - 1].id + 1),
                            title: podcast.title,
                            thumbnail: Iurl,
                            url: Aurl,
                            desc: podcast.desc,
                            name: podcast.name
                        }
                        await updateDoc(docRef, {
                            media: arrayUnion(data)
                        });
                        return true
                    })
                })
                
            });
        });
    } catch (error) {
        console.log(error)
        return false
    } 
}

const deletePodcast = async (podcast) => {

    try {

        const imageRef = ref(storage, podcast.thumbnail);
        const audioRef = ref(storage, podcast.url);

        try{
            await deleteObject(imageRef);
            await deleteObject(audioRef);
        }catch (error){
            console.log(error)
        }
    
        var docRef = doc(db, "Podcast", "XQSfeHu86Wh33ElSRIZt")
        await updateDoc(docRef, {
            media: arrayRemove(podcast)
        });
        const pods = getPodcasts()
        return pods
    } catch (error) {
        console.log(error)
        return false
    } 
}

const updatePodcast = async (oldPodcast, imageUpload, audioUpload, podcast) => {
    
    try {

        var imageRef = ''
        var audioRef = ''
        var ImageURL = ''
        var AudioURL = ''

        if(imageUpload){

            imageRef = ref(storage, oldPodcast.thumbnail);
            await deleteObject(imageRef);

            imageRef = ref(storage, `podcasts/images/${imageUpload.name + v4()}`);
            ImageURL = uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
                return getDownloadURL(snapshot.ref).then(async (Iurl) => {
                    return Iurl
                });
            });
            
        }else{
            ImageURL = oldPodcast.thumbnail
        }


        if(audioUpload){
            audioRef = ref(storage, oldPodcast.url);
            await deleteObject(audioRef);

            audioRef = ref(storage, `podcasts/audios/${audioUpload.name + v4()}`);
            AudioURL = uploadBytes(audioRef, audioUpload).then(async (snapshot) => {
                return getDownloadURL(snapshot.ref).then(async (Aurl) => {
                   return Aurl
                })
            })
        }else{
            AudioURL = oldPodcast.url
        }

        var docRef = doc(db, "Podcast", "XQSfeHu86Wh33ElSRIZt")
        await updateDoc(docRef, {
            media: arrayRemove(oldPodcast)
        });

        return Promise.resolve(ImageURL).then(function(IURL) {
            return Promise.resolve(AudioURL).then(async function(AURL) {
                var data = {
                    id: oldPodcast.id,
                    title: podcast.title,
                    thumbnail: IURL,
                    url: AURL,
                    desc: podcast.desc,
                    name: podcast.name
                }

                await updateDoc(docRef, {
                    media: arrayUnion(data)
                });

                const pods = await getPodcasts()
                return pods
            })
        })        
        
    } catch (error) {
        console.log(error)
        return false
    } 
}


export{getPodcasts, addPodcast, deletePodcast, updatePodcast}