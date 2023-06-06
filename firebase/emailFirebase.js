//import firebase from "firebase/app";
import { db, firebase } from "./firebaseconfig";

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
  limit,
} from "firebase/firestore";

export const updateEmail = async (email, newData) => {
  const emailRef = doc(db, "emails", email);
  const emailDoc = await getDoc(emailRef);

  if (emailDoc.exists()) {
    // email đã tồn tại trong Firestore, không cập nhật gì cả
    return false;
  } else {
    // thêm email mới vào Firestore
    try {
      await setDoc(emailRef, newData);
      return true;
    } catch (error) {
      console.error("Error updating email:", error);
      return false;
    }
  }
};
