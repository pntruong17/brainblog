import {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebaseconfig";
//import { useState, useEffect } from "react";

//const [users, setUsers] = useState()

let codesampple = {
  gender: 0,
  age: 35,
  country: "Vietnam",
  education: "High Shool",
  iqpoint: 100,
  time: 90,
  wrongs: [],
};

export const createQuiz = async (data) => {
  // Add a new document with a generated id
  const newCityRef = doc(collection(db, "quizs"));

  await setDoc(newCityRef, data);
};

export const getQuiz = async () => {
  const quizDoc = [];
  const querySnapshot = await getDocs(collection(db, "quizs"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    quizDoc.push({
      ...doc.data(),
      id: doc.id,
    });
  });
  return quizDoc;
};

/////////// Trivia save game

// gọi hàm saveRecordTrivia

// const newRecord = {
//   id: "0101",
//   name:"guess this famous singers"
//   pointFirstPlayEveryUser: 1543,
// };

// saveRecord(newRecord)
//   .then(() => {
//     console.log("Record saved successfully");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// id: "braingame000",
// id: "trivia0000",

export const saveRecordTrivia = async (newRecord) => {
  const { id, name, pointFirstPlayEveryUser } = newRecord;
  const triviaRef = doc(db, "trivia", id); // Get reference to the "trivia" document

  try {
    const triviaDoc = await getDoc(triviaRef); // Get the trivia document

    if (triviaDoc.exists()) {
      // Case 1: Update existing document
      const data = triviaDoc.data();
      const nextTrivia = [
        ...data.pointFirstPlayEveryUser,
        pointFirstPlayEveryUser,
      ];
      await updateDoc(triviaRef, {
        pointFirstPlayEveryUser: nextTrivia,
      });
    } else {
      // Case 2: Create new document
      await setDoc(triviaRef, {
        id: id,
        name: name,
        pointFirstPlayEveryUser: [pointFirstPlayEveryUser],
      });
    }
  } catch (error) {
    console.error("Error adding record trivia:", error);
  }
};

// gọi hàm calculatePercentageIncrease
// const newRecord = {
//   id: "0101",
//   pointFirstPlayEveryUser: 1543,
// };

// calculatePercentageIncrease(newRecord)
//   .then((percentage) => {
//     if (percentage === null) {
//       console.log(`Document with id ${newRecord.id} does not exist`);
//     } else {
//       console.log(`Percentage increase: ${percentage.toFixed(2)}%`);
//     }
//   })
//   .catch((error) => {
//     console.error(error);
//   });

export const calculatePercentageIncrease = async (newRecord) => {
  const { id, pointFirstPlayEveryUser } = newRecord;
  const triviaRef = doc(db, "trivia", id); // Tạo tham chiếu đến collection "trivia"
  const triviaDoc = await getDoc(triviaRef); // Get the user document

  if (!triviaDoc.exists()) {
    throw new Error("Trivia document does not exist");
  }

  const data = triviaDoc.data();
  const total = data.pointFirstPlayEveryUser.reduce((acc, val) => acc + val, 0);
  const average = total / data.pointFirstPlayEveryUser.length;
  const increasePercentage =
    ((pointFirstPlayEveryUser - average) / average) * 100;

  return increasePercentage;
};

// user thêm các trường sau: neurons + idTrivia
// tạo collection topneuron : update top 10 mỗi 3 giờ

// gọi hàm calculatePercentageIncrease
// const newRecord = {
//   id: "0101",
//   pointFirstPlayEveryUser: 1543,
// };

// calculatePercentageIncrease(newRecord)
//   .then((percentage) => {
//     if (percentage === null) {
//       console.log(`Document with id ${newRecord.id} does not exist`);
//     } else {
//       console.log(`Percentage increase: ${percentage.toFixed(2)}%`);
//     }
//   })
//   .catch((error) => {
//     console.error(error);
//   });
//----------------------------------------------------------------
// gọi hàm saveRecordTrivia

// const newRecord = {
//   id: "0101",
//   name:"guess this famous singers"
//   pointFirstPlayEveryUser: 1543,
// };

// saveRecord(newRecord)
//   .then(() => {
//     console.log("Record saved successfully");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// id: "braingame000",
// id: "trivia0000",
