import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { companies } from "../data/companies";

export const seedCompanies = async () => {
  try {
    console.log("seeding companies...");

    const batchPromises = companies.map(async (company) => {
      const ref = doc(collection(db, "companies"), company.id);

      await setDoc(ref, {
        ...company,
        createdAt: new Date(),
      });
    });

    await Promise.all(batchPromises);

    console.log("companies seeded successfully!");
  } catch (error) {
    console.log("Error seeding companies:", error.message);
  }
};
