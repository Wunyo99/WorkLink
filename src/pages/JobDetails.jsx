import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchJobById } from "../utils/singleJob";
import Spinner from "../components/Spinner";
const JobDetails = () => {
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
  return (
    <div>
      <h1>{job.title}</h1>
    </div>
  );
};

export default JobDetails;
