import JobCard from "../components/JobCard";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "../utils/allJobs_http";
import Spinner from "../components/Spinner";

const Jobs = () => {
  const {
    data: jobs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    
    <section className="section-padding grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <JobCard jobs={jobs} />
    </section>
  );
};

export default Jobs;
