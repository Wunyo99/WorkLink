import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchJobById } from "../utils/singleJob";
import Spinner from "../components/Spinner";
import CompanyLogo from "../components/CompanyLogo";
import { CheckCircle } from "lucide-react";
import ApplyForm from "../components/ApplyForm";
import { useState } from "react";
import Modal from "../components/Modal";
import { Check } from "lucide-react";
const JobDetails = () => {
  const [showThankYou, setShowThankYou] = useState(false);

  const { id } = useParams();

  const {
    data: job,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobById(id),
    enabled: !!id,
  });

  if (isLoading) return <Spinner />;

  if (isError) return <p className="font-bold text-red-500">{error.message}</p>;

  if (!job) return <p>Job not found</p>;

  // const mutation = useMutation();

  const formatSalary = (salary) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GHS",
      maximumFractionDigits: 0,
    }).format(salary);
  return (
    <section className="section-padding grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="space-y-5">
        <div>
          <h4 className="text-2xl font-medium mb-">About this role</h4>
          <div className="w-10 h-1 bg-purple-800" />
        </div>

        <div className="flex flex-col md:flex-row md:items-cente gap-5">
          <CompanyLogo companyId={job.companyId} name={job.companyId} />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-medium text-gray-800">
                {job.title}
              </h1>
              <p className="text-sm mt-1 text-gray-500 bg-gray-200 px-2 font-medium rounded-full">
                {job.experienceLevel}
              </p>
            </div>
            <p className="font-medium text-purple-800">{job.employmentType}</p>
            <div className="flex gap-2 text-s font-medium text-gray-500">
              <p className="capitalize">{job.companyId}</p>•
              <p>{job.location}</p>
            </div>
            <p className="font-bold">
              {formatSalary(job.salaryMin)} - {formatSalary(job.salaryMax)}
            </p>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-purple-800 mb-2 text-xl">
            Job description:
          </h4>
          <p>{job.description}</p>
        </div>
        <div>
          <h4 className="font-medium mb-2 text-purple-800 text-xl">Skills:</h4>
          <div className="flex gap-4 flex-wrap">
            {job.skills.map((skill) => (
              <div
                key={skill}
                className="border-2 border-purple-800 bg-purple-100 px-4 py-3 rounded-2xl"
              >
                <p className="font-medium">{skill}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2 text-purple-800 text-xl">
            Requirements:
          </h4>
          <div className="flex flex-col gap-4">
            {job.requirements.map((req) => (
              <div key={req} className="flex items-center gap-2">
                <CheckCircle className="text-green-700" size={18} />
                <p className="font-medium">{req}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2 text-purple-800 text-xl">
            Responsibilities:
          </h4>
          <div className="flex flex-col gap-4">
            {job.responsibilities.map((res) => (
              <div key={res} className="flex items-center gap-2">
                <CheckCircle className="text-green-700" size={18} />
                <p className="font-medium">{res}</p>
              </div>
            ))}
          </div>
        </div>
        {/* <div>
          <h4 className="font-medium mb-2 text-purple-800 text-xl">Vacancy:</h4>
          <p className="font-bold">{job.vacancies}</p>
        </div> */}
        <div>
          <h4 className="font-medium text-purple-800 text-xl">Email:</h4>
          <p className="font-semibold">{job.contactEmail}</p>
        </div>
      </div>
      <div>
        <ApplyForm
          job={job}
          onSuccess={() => {
            setShowThankYou(true); // open thank you modal
          }}
        />
      </div>

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
    </section>
  );
};

export default JobDetails;
