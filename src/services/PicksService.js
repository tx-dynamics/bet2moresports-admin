import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from "firebase/storage";
import { storage } from "./firestoreInstance";
import { v4 } from "uuid";
import { getFirestore, getDocs, collection, updateDoc, arrayUnion, doc, arrayRemove } from "firebase/firestore";

const db = getFirestore();


const getPicks = async () => {
    try {
        let data = null
        const querySnapshot = await getDocs(collection(db, "Picks"))
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


const addPick = async (imageUpload, pick) => {

    try {
        const imageRef = ref(storage, `picks/${imageUpload.name + v4()}`);
        return uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
            return getDownloadURL(snapshot.ref).then(async (url) => {
                var docRef = doc(db, "Picks", "oA9L5PlasNjJi5tMOz1E")
                // console.log(docRef)
                let d = null
                const querySnapshot = await getDocs(collection(db, "Picks"))
                querySnapshot.forEach((doc) => {
                    d = doc.data()
                    d = d.media
                });
                var data = {
                    id: d === undefined || d.length === 0  ? 0 : parseInt(d[d.length - 1].id + 1),
                    title: pick.title,
                    thumbnail: url 
                }
                await updateDoc(docRef, {
                    media: arrayUnion(data)
                });
                return true
            });
        });
    } catch (error) {
        console.log(error)
        return false
    } 
}

const deletePick = async (pick) => {

    try {

        try {
            const imageRef = ref(storage, pick.thumbnail);
            await deleteObject(imageRef);
        } catch (error) {
            console.log(error)
        }

        var docRef = doc(db, "Picks", "oA9L5PlasNjJi5tMOz1E")
        // console.log(docRef)
        await updateDoc(docRef, {
            media: arrayRemove(pick)
        });
        const picks = getPicks()
        return picks
    } catch (error) {
        console.log(error)
        return false
    } 
}



export{getPicks, addPick, deletePick}