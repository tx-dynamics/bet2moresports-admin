import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";
import { storage } from "./firestoreInstance";
import { v4 } from "uuid";

import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc
} from "firebase/firestore";

const db = getFirestore();

const getArticles = async () => {
    try {
        let list = []
        const querySnapshot = await getDocs(collection(db, "articles"))
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            data['id'] = doc.id
            list.push(data)
        });
        return list
    } catch (error) {
        console.log(error)
    }
}


const addArticle = async (imageUpload, article) => {

    try {
        const imageRef = ref(storage, `articles/${imageUpload.name + v4()}`);
        return uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
            return getDownloadURL(snapshot.ref).then(async (url) => {
                await addDoc(collection(db, "articles"), {
                    author: article.author,
                    heading: article.heading,
                    discription: article.discription,
                    image: url,
                    createdAt: new Date().toLocaleDateString(),
                });
                return true
            });
        });
    } catch (error) {
        console.log(error)
        return false
    } 
}

const deleteArticle = async (article) => {
    try {

        try{
            const imageRef = ref(storage, article.image);
            await deleteObject(imageRef);
        }catch(err) {
            console.log(err)
        }

        await deleteDoc(doc(db, "articles", article.id));

        const articles = getArticles()

        return articles
        
    } catch (error) {
        console.log(error)
        return false
    }
}

const updateArticle = async (oldArticle, imageUpload, article) => {

    try {

        var imageRef = ''
        var ImageURL = ''

        if(imageUpload){

            imageRef = ref(storage, oldArticle.image);
            await deleteObject(imageRef);

            imageRef = ref(storage, `articles/${imageUpload.name + v4()}`);
            ImageURL = uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
                return getDownloadURL(snapshot.ref).then(async (Iurl) => {
                    return Iurl
                });
            });
            
        }else{
            ImageURL = oldArticle.image
        }

        await deleteDoc(doc(db, "articles", oldArticle.id));

        return Promise.resolve(ImageURL).then(async(url) => {
            await addDoc(collection(db, "articles"), {
                author: article.author,
                heading: article.heading,
                discription: article.discription,
                image: url,
                createdAt: new Date().toLocaleDateString(),
            });

            const articles = getArticles()

            return articles
        })
        
    } catch (error) {
        console.log(error)
        return false
    }
}

export{addArticle, getArticles, deleteArticle, updateArticle}