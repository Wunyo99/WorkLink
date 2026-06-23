import { useState } from "react";

const ApplyForm = ({ job, onSuccess }) => {
  const [isApplying, setIsApplying] = useState(false);
  console.log("Job:", job);
  const handleApply = async (e) => {
    e.preventDefault();
    setIsApplying(true);
    const formData = new FormData(e.target);
    const application = {
      ...Object.fromEntries(formData.entries()),
      job: job.id,
    };

    // const { fullname, email, phone, cv, addInfo } = application;

    console.log(application);

    setTimeout(() => {
      setIsApplying(false);
      onSuccess?.();
      e.target.reset();
    }, 2000);
  };
  return (
    <>
      <form onSubmit={handleApply} className="sticky top-32">
        <div className="border border-gray-200 rounded-lg p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-800 font-medium">
                Full Name
              </label>{" "}
              <input
                className="py-3 px-5 mt-2 w-full bg-gray-200 border-0 focus:outline-purple-500 rounded-lg"
                type="text"
                name="fullname"
                placeholder="John Doe"
                required
              />{" "}
            </div>
            <div>
              <label className="text-sm text-gray-800 font-medium">Email</label>{" "}
              <input
                className="py-3 px-5 mt-2 w-full bg-gray-200 border-0 focus:outline-purple-500 rounded-lg"
                type="email"
                name="email"
                placeholder="johndoe@gmail.com"
                required
              />{" "}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="text-sm text-gray-800 font-medium">Phone</label>{" "}
              <input
                className="py-3 px-5 mt-2 w-full bg-gray-200 border-0 focus:outline-purple-500 rounded-lg"
                type="tel"
                name="phone"
                placeholder="XXXXXXXXXX"
                required
              />{" "}
            </div>
            <div>
              <label className="text-sm text-gray-800 font-medium">
                Upload CV
              </label>{" "}
              <input
                className="py-3 px-5 mt-2 w-full bg-gray-200 border-0 focus:outline-purple-500 rounded-lg"
                type="file"
                accept=".pdf,.doc,.docx"
                name="cv"
                required
              />{" "}
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-sm text-gray-800 font-medium mb-1">
              Additional Info
            </label>{" "}
            <textarea
              rows={4}
              name="addInfo"
              placeholder="Tell us why you're a great fit for this role..."
              className="py-3 px-5 w-full bg-gray-200 border-0 focus:outline-purple-500 rounded-lg"
              required
            ></textarea>
          </div>
          <div className="flex gap-2 items-center mt-4">
            <input name="agreement" type="checkbox" required />
            <label htmlFor="agree">
              I certify that the information provided is accurate.
            </label>
          </div>
          <button
            disabled={isApplying}
            className="w-full justify-center px-10 py-2 text-white bg-purple-800 font-semibold text-lg rounded-lg mt-5  hover:scale-99 duration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isApplying ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Applying...
              </span>
            ) : (
              "Apply"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default ApplyForm;
