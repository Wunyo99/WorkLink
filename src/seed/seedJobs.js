import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { jobListings } from "../data/jobListings";

export const seedJobs = async () => {
  try {
    console.log("Seeding jobs...");

    for (const job of jobListings) {
      const jobId =
        job.id ||
        `${job.companyId}_${job.title
          .replace(/\s+/g, "_")
          .replace(/[^\w]/g, "")
          .toLowerCase()}`;

      await setDoc(doc(db, "jobs", jobId), {
        ...job,
        id: jobId,
        createdAt: new Date(),
      });

      console.log(`Seeded: ${job.title}`);
    }

    console.log("All jobs seeded successfully!");
  } catch (error) {
    console.error("Error seeding jobs:", error.message);
  }
};
