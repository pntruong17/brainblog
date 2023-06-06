import { db } from "./firebaseconfig";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// import các thành phần khác mà bạn muốn sử dụng từ Firebase

import {
  collection,
  updateDoc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  limit
} from "firebase/firestore";

const sample_userdata = {
  uid: "",
  displayName: "",
  email: "",
  photoURL: "",
  numberTestRemain: 0,
  education: "",
  yourdata: {
    iqlvl: "",
    age: "",
    country: ""
  }
};

export const updateUser = async (uid, newData) => {
  const userRef = doc(db, "users", uid); // Get reference to the user document
  const userDoc = await getDoc(userRef); // Get the user document

  if (userDoc.exists()) {
    // Check if the user exists
    await updateDoc(userRef, newData); // Update the document with new data
  } else {
    // Create a new user document with the given uid
    await setDoc(userRef, newData);
  }
};

export const deleteUser = async uid => {
  const userDoc = doc(db, "users", uid);
  await deleteDoc(userDoc);
};

export const returnIQTestRemain = async uid => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().numberTestRemain;
    } else {
      return null;
      // doc.data() will be undefined in this case
    }
  } catch (error) {
    console.log(error);
  }
};

export const getYourData = async uid => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().yourdata;
    } else {
      return null;
      // doc.data() will be undefined in this case
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchDocById = async uid => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
      // doc.data() will be undefined in this case
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkUserExistence = async collectionId => {
  try {
    const collectionRef = firebase.firestore().collection("users");
    const doc = await collectionRef.doc(collectionId).get();

    if (doc.exists) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addNeuronAndIdTrivia = async newRecord => {
  const { uid, idTrivia, neurons } = newRecord;
  const userRef = doc(db, "users", uid); // Tạo tham chiếu đến collection "users"

  try {
    const userDoc = await getDoc(userRef); // Get the user document

    if (userDoc.exists()) {
      // Case 1: Update existing document
      const data = userDoc.data();
      const isPlayed = data.idTrivia.some(id => id === idTrivia);
      console.log(isPlayed);
      let nextIdTrivia = [...data.idTrivia];
      if (!isPlayed) {
        nextIdTrivia.push(idTrivia);
      }

      await updateDoc(userRef, {
        idTrivia: nextIdTrivia,
        neurons: data.neurons + neurons
      });
    } else {
      // Case 2: Create new document
      await setDoc(userRef, {
        uid: uid,
        idTrivia: [idTrivia],
        neurons: neurons
      });
    }
  } catch (error) {
    console.error("Error adding neuron and trivia ID:", error);
  }
};

export const returnNeuronsAndAddNeuronAndIdTrivia =
  async newRecord => {
    const { uid, idTrivia, neurons } = newRecord;
    const userRef = doc(db, "users", uid); // Tạo tham chiếu đến collection "users"
    const returnNeuron = {
      oldNeurons: undefined,
      newNeurons: undefined
    };
    try {
      const userDoc = await getDoc(userRef); // Get the user document

      if (userDoc.exists()) {
        // Case 1: Update existing document
        const data = userDoc.data();
        const isPlayed = data.idTrivia.some(id => id === idTrivia);
        console.log(isPlayed);
        let nextIdTrivia = [...data.idTrivia];
        if (!isPlayed) {
          nextIdTrivia.push(idTrivia);
        }

        await updateDoc(
          userRef,
          {
            idTrivia: nextIdTrivia,
            neurons: data.neurons + neurons
          },
          { merge: true }
        );

        returnNeuron.newNeurons = data.neurons + neurons;
        returnNeuron.oldNeurons = data.neurons;
      } else {
        // Case 2: Create new document
        await setDoc(userRef, {
          uid: uid,
          idTrivia: [idTrivia],
          neurons: neurons
        });
        returnNeuron.newNeurons = neurons;
        returnNeuron.oldNeurons = 0;
      }
    } catch (error) {
      console.error("Error adding neuron and trivia ID:", error);
    }
    return returnNeuron;
  };

export const returnTopTenNeuronsUsers = async () => {
  const userRef = collection(db, "users"); // Get reference to the "users" collection
  const q = query(userRef, orderBy("neurons", "desc"), limit(3));
  const querySnapshot = await getDocs(q);
  const topTenUsers = [];

  querySnapshot.forEach(doc => {
    topTenUsers.push(doc.data());
  });

  return topTenUsers;
};
