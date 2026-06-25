import JobCard from "../components/JobCard";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "../utils/allJobs_http";
import Spinner from "../components/Spinner";
import { useState } from "react";
import { ChevronsLeft, ChevronsRight, Funnel } from "lucide-react";
import { X } from "lucide-react";
import { Search } from "lucide-react";

const Jobs = () => {
  const [filters, setFilters] = useState({
    sort: "",
    salaryRange: "",
    minSalary: "",
    maxSalary: "",
    jobTypes: [],
    locations: [],
    searchTerm: "",
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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

  const handleJobType = (type) => {
    setFilters((prev) => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(type)
        ? prev.jobTypes.filter((t) => t !== type)
        : [...prev.jobTypes, type],
    }));
  };

  const handleJobLocation = (location) => {
    setFilters((prev) => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter((l) => l !== location)
        : [...prev.locations, location],
    }));
  };
  const filteredJobs = jobs.filter((job) => {
    const search = filters.searchTerm?.toLowerCase() || "";
    if (
      filters.searchTerm &&
      !(
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.companyId.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase()) ||
        job.category.toLowerCase().includes(search.toLowerCase()) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(search.toLowerCase()),
        )
      )
    ) {
      return false;
    }

    if (
      filters.jobTypes.length > 0 &&
      !filters.jobTypes.includes(job.employmentType)
    ) {
      return false;
    }

    if (
      filters.locations.length > 0 &&
      !filters.locations.includes(job.workMode)
    ) {
      return false;
    }

    if (filters.salaryRange) {
      const min = job.salaryMin;
      const max = job.salaryMax;

      if (filters.salaryRange === "0-5000") {
        if (max < 0 || min > 5000) return false;
      }

      if (filters.salaryRange === "5000-10000") {
        if (max < 5000 || min > 10000) return false;
      }

      if (filters.salaryRange === "10000-15000") {
        if (max < 10000 || min > 15000) return false;
      }

      if (filters.salaryRange === "15000+") {
        if (max < 15000) return false;
      }
    }

    return true;
  });

  const sortedJobs = [...filteredJobs];

  switch (filters.sort) {
    case "az":
      sortedJobs.sort((a, b) => a.title.localeCompare(b.title));
      break;

    case "salary":
      sortedJobs.sort((a, b) => b.salaryMax - a.salaryMax);
      break;

    case "trending":
      sortedJobs.sort((a, b) => Number(b.featured) - Number(a.featured));
      break;

    default:
      break;
  }

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const hasJobs = sortedJobs.length > 0;

  const resetFilters = () => {
    setFilters({
      sort: "",
      minSalary: "",
      maxSalary: "",
      jobTypes: [],
      locations: [],
      searchTerm: "",
    });
  };

  // Pagination
  const jobsPerPage = 9;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  const currentJobs = sortedJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);

  return (
    <>
      <section className="py-10 px-3 grid lg:grid-cols-5 gap-4 ">
        <div className="bg-white rounded-2xl flex-col border-2 h-fit border-purple-300 p-5 hidden lg:flex">
          {" "}
          <h5 className="text-xl font-medium py-2">Filters</h5>
          <hr className="text-gray-300" />
          <div className="py-5">
            <h5 className="text-sm font-medium mb-2">Sort By</h5>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  name="sort"
                  checked={filters.sort === "az"}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      sort: "az",
                    }))
                  }
                />
                <p className="text-sm font-medium">A-Z</p>
              </div>

              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  name="sort"
                  checked={filters.sort === "salary"}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      sort: "salary",
                    }))
                  }
                />
                <p className="text-sm font-medium">Top Salary</p>
              </div>

              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  name="sort"
                  checked={filters.sort === "trending"}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      sort: "trending",
                    }))
                  }
                />
                <p className="text-sm font-medium">Trending</p>
              </div>
            </div>
          </div>
          <hr className="text-gray-300" />
          <div className="py-5">
            <h5 className="text-sm font-medium mb-2">Salary</h5>

            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="radio"
                  name="salary"
                  checked={filters.salaryRange === "0-5000"}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      salaryRange: "0-5000",
                    }))
                  }
                />
                0 - 5k
              </label>

              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="radio"
                  name="salary"
                  checked={filters.salaryRange === "5000-10000"}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      salaryRange: "5000-10000",
                    }))
                  }
                />
                5k - 10k
              </label>

              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="radio"
                  name="salary"
                  checked={filters.salaryRange === "10000-15000"}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      salaryRange: "10000-15000",
                    }))
                  }
                />
                10k - 15k
              </label>

              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="radio"
                  name="salary"
                  checked={filters.salaryRange === "15000+"}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      salaryRange: "15000+",
                    }))
                  }
                />
                15k+
              </label>
            </div>
          </div>
          <hr className="text-gray-300" />
          <div className="py-5">
            <h5 className="text-sm font-medium mb-2">Job Type</h5>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.jobTypes.includes("Full-Time")}
                  onChange={() => handleJobType("Full-Time")}
                />
                <p className="text-sm font-medium">Full-time</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.jobTypes.includes("Part-Time")}
                  onChange={() => handleJobType("Part-Time")}
                />{" "}
                <p className="text-sm font-medium">Part-time</p>
              </div>
            </div>
          </div>
          <hr className="text-gray-300" />
          <div className="py-5">
            <h5 className="text-sm font-medium mb-2">Location</h5>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.locations.includes("Remote")}
                  onChange={() => handleJobLocation("Remote")}
                />{" "}
                <p className="text-sm font-medium">Remote</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.locations.includes("Onsite")}
                  onChange={() => handleJobLocation("Onsite")}
                />{" "}
                <p className="text-sm font-medium">On-site</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.locations.includes("Hybrid")}
                  onChange={() => handleJobLocation("Hybrid")}
                />{" "}
                <p className="text-sm font-medium">Hybrid</p>
              </div>
            </div>
          </div>
          <button
            onClick={resetFilters}
            className="bg-purple-300 p-2 rounded-lg text-purple-800 font-medium cursor-pointer hover:scale-x-97 duration-300"
          >
            Reset
          </button>
        </div>
        <div className="col-span-4">
          <div className="mb-5 md:mb-0 flex justify-center lg:justify-start">
            <form className="relative">
              <Search className="absolute top-4 inset-s-3" size={18} />
              <input
                className="focus:outline-purple-800 border-0 bg-[#f1f5f9] rounded-full py-3 pl-10  w-80"
                type="text"
                value={filters.searchTerm}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    searchTerm: e.target.value,
                  }))
                }
                placeholder="Search for jobs..."
              />
            </form>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="lg:hidden ">
              <div className="bg-purple-200 py-1 px-2 rounded-full text-purple-800 font-medium">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2"
                >
                  <Funnel size={16} />
                  <span>Filter</span>
                </button>
              </div>

              {isFilterOpen && (
                <>
                  <div className="bg-white fixed p-5 inset-0 z-100 md:w-[50%] overflow-y-auto">
                    <div className="bg-white rounded-2xl md:w-120 mx-aut flex flex-col border-2 h-fit border-purple-800 p-5">
                      {" "}
                      <div className="flex items-center justify-between">
                        <h5 className="text-xl font-medium py-2">Filters</h5>

                        <button onClick={() => setIsFilterOpen(!isFilterOpen)}>
                          <X />
                        </button>
                      </div>
                      <hr className="text-gray-300" />
                      <div className="py-5">
                        <h5 className="text-sm font-medium mb-2">Sort By</h5>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="sort"
                              checked={filters.sort === "az"}
                              onChange={() =>
                                setFilters((prev) => ({
                                  ...prev,
                                  sort: "az",
                                }))
                              }
                            />
                            <p className="text-sm font-medium">A-Z</p>
                          </div>

                          <div className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="sort"
                              checked={filters.sort === "salary"}
                              onChange={() =>
                                setFilters((prev) => ({
                                  ...prev,
                                  sort: "salary",
                                }))
                              }
                            />
                            <p className="text-sm font-medium">Top Salary</p>
                          </div>

                          <div className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="sort"
                              checked={filters.sort === "trending"}
                              onChange={() =>
                                setFilters((prev) => ({
                                  ...prev,
                                  sort: "trending",
                                }))
                              }
                            />
                            <p className="text-sm font-medium">Trending</p>
                          </div>
                        </div>
                      </div>
                      <hr className="text-gray-300" />
                      <div className="py-5">
                        <h5 className="text-sm font-medium mb-2">Salary</h5>

                        <div className="grid grid-cols-2 gap-2">
                          <label className="flex items-center gap-2 text-sm font-medium">
                            <input
                              type="radio"
                              name="salary"
                              checked={filters.salaryRange === "0-5000"}
                              onChange={() =>
                                setFilters((prev) => ({
                                  ...prev,
                                  salaryRange: "0-5000",
                                }))
                              }
                            />
                            0 - 5k
                          </label>

                          <label className="flex items-center gap-2 text-sm font-medium">
                            <input
                              type="radio"
                              name="salary"
                              checked={filters.salaryRange === "5000-10000"}
                              onChange={() =>
                                setFilters((prev) => ({
                                  ...prev,
                                  salaryRange: "5000-10000",
                                }))
                              }
                            />
                            5k - 10k
                          </label>

                          <label className="flex items-center gap-2 text-sm font-medium">
                            <input
                              type="radio"
                              name="salary"
                              checked={filters.salaryRange === "10000-15000"}
                              onChange={() =>
                                setFilters((prev) => ({
                                  ...prev,
                                  salaryRange: "10000-15000",
                                }))
                              }
                            />
                            10k - 15k
                          </label>

                          <label className="flex items-center gap-2 text-sm font-medium">
                            <input
                              type="radio"
                              name="salary"
                              checked={filters.salaryRange === "15000+"}
                              onChange={() =>
                                setFilters((prev) => ({
                                  ...prev,
                                  salaryRange: "15000+",
                                }))
                              }
                            />
                            15k+
                          </label>
                        </div>
                      </div>
                      <hr className="text-gray-300" />
                      <div className="py-5">
                        <h5 className="text-sm font-medium mb-2">Job Type</h5>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={filters.jobTypes.includes("Full-Time")}
                              onChange={() => handleJobType("Full-Time")}
                            />
                            <p className="text-sm font-medium">Full-time</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={filters.jobTypes.includes("Part-Time")}
                              onChange={() => handleJobType("Part-Time")}
                            />{" "}
                            <p className="text-sm font-medium">Part-time</p>
                          </div>
                        </div>
                      </div>
                      <hr className="text-gray-300" />
                      <div className="py-5">
                        <h5 className="text-sm font-medium mb-2">Location</h5>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={filters.locations.includes("Remote")}
                              onChange={() => handleJobLocation("Remote")}
                            />{" "}
                            <p className="text-sm font-medium">Remote</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={filters.locations.includes("Onsite")}
                              onChange={() => handleJobLocation("Onsite")}
                            />{" "}
                            <p className="text-sm font-medium">On-site</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={filters.locations.includes("Hybrid")}
                              onChange={() => handleJobLocation("Hybrid")}
                            />{" "}
                            <p className="text-sm font-medium">Hybrid</p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={resetFilters}
                        className="bg-purple-300 p-2 rounded-lg text-purple-800 font-medium cursor-pointer hover:scale-x-97 duration-300"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div />
            <p className="font-medium text-sm">Results: {sortedJobs.length}</p>
          </div>

          {hasJobs ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <JobCard jobs={currentJobs} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h2 className="text-xl font-semibold text-gray-700">
                No jobs found!
              </h2>
              <p className="text-gray-500 mt-2">
                Try adjusting your filters or clearing them.
              </p>

              <button
                onClick={resetFilters}
                className="mt-4 bg-purple-200 font-medium text-purple-800 px-4 py-2 rounded-lg hover:scale-95 duration-300 cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
      <div className="flex justify-center gap-2 py-8">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-200 text-purple-800 rounded-lg cursor-pointer disabled:opacity-50"
        >
          <ChevronsLeft />
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentPage === index + 1
                ? "bg-purple-800 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 text-purple-800 rounded-lg cursor-pointer disabled:opacity-50"
        >
          <ChevronsRight />
        </button>
      </div>
    </>
  );
};

export default Jobs;
