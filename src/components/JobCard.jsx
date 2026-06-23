import { Bookmark, X } from "lucide-react";
import { jobListings } from "../data/jobListings";
import { Link } from "react-router";
import { getLogoUrl } from "../utils/getLogo";
import { companies } from "../data/companies";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";
import ApplyForm from "./ApplyForm";
import { Check } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const JobCard = ({ jobs, limit }) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const [localSavedJobs, setLocalSavedJobs] = useState([]);
  const { user } = useContext(AuthContext);

  const savedJobs = user?.savedJobs || [];
  const handleSaveJob = async (jobId) => {
    if (!user) return toast.error("Please login");

    const userRef = doc(db, "users", user.uid);

    const isSaved = localSavedJobs.includes(jobId);

    try {
      await updateDoc(userRef, {
        savedJobs: isSaved ? arrayRemove(jobId) : arrayUnion(jobId),
      });

      setLocalSavedJobs((prev) =>
        isSaved ? prev.filter((id) => id !== jobId) : [...prev, jobId],
      );

      toast.success(isSaved ? "Removed from saved" : "Job saved");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setLocalSavedJobs(user?.savedJobs || []);
  }, [user]);

  const displayedJobs = limit ? jobs.slice(0, limit) : jobs;
  return (
    <>
      {displayedJobs.map((job) => (
        <div
          key={job.id}
          className="border-2 border-gray-200 rounded-2xl p-5 space-y-3 hover:shadow-xl duration-200"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="w-10 h-10 rounded-xl ">
              <img
                src={getLogoUrl(`${job.companyId}.com`)}
                className="w-10 h-10 rounded-lg"
              />
            </div>
            <button onClick={() => handleSaveJob(job.id)}>
              <Bookmark
                className={`cursor-pointer ${
                  localSavedJobs.includes(job.id)
                    ? "text-purple-800 fill-purple-800"
                    : "text-gray-400"
                }`}
              />
            </button>
          </div>
          <div>
            <div className="flex gap-2 items-center ">
              {" "}
              <h3 className="font-medium text-xl">{job.title}</h3>
              <span className="text-sm  font-medium text-purple-800 mt-1">
                {job.type}
              </span>
            </div>
            <div className="text-sm text-gray-500 font-medium flex gap-2">
              <p className="capitalize">{job.companyId}</p>
              <span>•</span>
              <p>{job.location}</p>
            </div>
          </div>
          <div>
            <p>{job.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`/jobs/${job.id}`}
              className="bg-gray-800 text-white py-2 px-4 font-medium rounded-lg hover:scale-95 duration-300"
            >
              View Details
            </a>
            <button
              onClick={() => setSelectedJob(job)}
              className="bg-purple-200 text-purple-800 font-medium py-2 px-4 rounded-lg cursor-pointer hover:scale-95 duration-300"
            >
              Apply Now
            </button>
          </div>
        </div>
      ))}
      <div>
        {selectedJob && (
          <Modal open={!!selectedJob} onClose={() => setSelectedJob(null)}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold mb-4">
                Apply for {selectedJob?.title}
              </h2>
              <X
                className="cursor-pointer"
                onClick={() => setSelectedJob(null)}
              />
            </div>

            <ApplyForm
              job={selectedJob}
              onSuccess={() => {
                setSelectedJob(null); // close apply modal
                setShowThankYou(true); // open thank you modal
              }}
            />
          </Modal>
        )}
      </div>
      <div>
        {showThankYou && (
          <Modal open={showThankYou} onClose={() => setShowThankYou(false)}>
            <div className="text-center flex flex-col gap-3 justify-center items-center space-y-4 py-6">
              <div className="w-18 h-18 rounded-full flex items-center justify-center bg-gray-100">
                <Check className="text-green-500" size={35} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-600">
                  Application Submitted!
                </h2>

                <p className="text-gray-600">
                  Thank you for applying. We’ll get back to you soon.
                </p>
              </div>

              <button
                onClick={() => setShowThankYou(false)}
                className="bg-purple-800 text-white px-10 py-2 rounded-lg cursor-pointer hover:scale-97 duration-200"
              >
                Close
              </button>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default JobCard;
