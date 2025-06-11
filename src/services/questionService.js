import { db } from '../firebase';  // firebase.js에서 초기화된 db를 import
import { doc, getDoc } from "firebase/firestore";

export const fetchQuestionsByCategory = async (category) => {
  const docRef = doc(db, "questions", category);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const questions = docSnap.data().list;
    return shuffleArray(questions);
  } else {
    console.error("No such document!");
    return [];
  }
};

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};