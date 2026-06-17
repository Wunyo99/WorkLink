import { Bookmark } from "lucide-react";
import { jobListings } from "../data/jobListings";
import { Link } from "react-router";
const JobCard = ({ isJobPage = false, limit }) => {
  const displayedJobs = limit ? jobListings.slice(0, limit) : jobListings;
  return (
    <>
      {displayedJobs.map((job) => (
        <div key={job.id} className="shadow p-5 space-y-3">
          <div className="flex items-center justify-between mb-5">
            <div className="w-10 h-10 rounded-xl bg-gray-800">
              <img src={job.logo} alt="" />
            </div>
            <button className="border-2 border-gray-800 rounded-full p-2">
              <Bookmark className="text-purple-800" />
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
              <p className="">{job.company}</p>
              <span>-</span>
              <p>{job.location}</p>
            </div>
          </div>
          <div>
            <p>{job.shortDescription}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link className="bg-gray-800 text-white py-2 px-4 font-medium rounded-lg hover:scale-95 duration-300">
              View Details
            </Link>
            <button className="bg-purple-200 text-purple-800 font-medium py-2 px-4 rounded-lg cursor-pointer hover:scale-95 duration-300">
              Apply Now
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobCard;
