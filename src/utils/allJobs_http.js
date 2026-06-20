import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const fetchJobs = async () => {
  const snapshot = await getDocs(collection(db, "jobs"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
