import JobCard from "../components/JobCard";
import { useJobs } from "../hooks/useJobs";
const Jobs = () => {
  const jobs = useJobs();

  return (
    <section className="section-padding grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <JobCard jobs={jobs} />
    </section>
  );
};

export default Jobs;
