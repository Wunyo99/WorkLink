import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const fetchJobById = async (id) => {
  const ref = doc(db, "jobs", id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    throw new Error("Job not found");
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};
