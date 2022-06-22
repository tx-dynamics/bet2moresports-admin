import "./firestoreInstance";
import { getFirestore, getDocs, collection, deleteDoc, doc, setDoc } from "firebase/firestore";

const db = getFirestore();


const getUsers = async () => {
  try {
    let data = []
    const querySnapshot = await getDocs(collection(db, "Users"))
    querySnapshot.forEach((doc) => {
        const d = doc.data()
        d['id'] = doc.id
        data.push(d)
    });
    return data
  } catch (error) {
      console.log(error)
  }
}

const deleteUser = async (docId) => {
  try {
    await deleteDoc(doc(db, "Users", docId));

    const users = await getUsers()

    return users

  } catch (error) {
    console.log(error)
    return false
  }
}

const userBlocking = async (block, docId) => {
  
  try {

    const docRef = doc(db, 'Users', docId);

    if(block){
      await setDoc(docRef, { userBlocked: false }, { merge: true });
    }else{
      await setDoc(docRef, { userBlocked: true }, { merge: true });
    }

    const users = await getUsers()

    console.log(users)

    return users
  
  } catch (error) {
    console.log(error)
    return false
  }

}

export{getUsers, deleteUser, userBlocking}