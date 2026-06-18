import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import JobCard from "../components/JobCard";
import Reviews from "../components/Reviews";
import { toast } from "react-toastify";
import {
  LaptopMinimalCheck,
  LightbulbIcon,
  LucideUserCheck2,
  Send,
  UserLock,
  UserPlus2,
} from "lucide-react";
const Home = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success("Thanks for subscribing");
    e.target.reset();
  };
  const steps = [
    {
      icon: <UserPlus2 />,
      h1: "Create account",
      p: "it's very easy to open an accountand start your journey.",
      link: "Register",
    },
    {
      icon: <LucideUserCheck2 />,
      h1: "Complete your profile",
      p: "Complete your profile with all the info to get attention of client.",
      link: "Update profile",
    },
    {
      icon: <Send />,
      h1: "Apply Job",
      p: "Apply and get your preferable jobs with all the requirements and get it.",
      link: "Apply Now",
    },
  ];

  const mission = [
    {
      icon: <LightbulbIcon />,
      h: "Focus On Skills",
      p: "Offers positions that suit your skills, and strives to provide opportunities that suit your background.",
    },
    {
      icon: <UserLock />,
      h: "Reputation And Security",
      p: "WorkLink can provide a sense of security in looking for workand interacting with companies.",
    },
    {
      icon: <LaptopMinimalCheck />,
      h: "Ease Of Access",
      p: "A platform that is often easy to access and use for both job seekers and companies looking for talent.",
    },
  ];
  return (
    <>
      <section>
        <Hero />
      </section>

      <section className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="w-full">
            <img
              className="w-full h-ful object-cover rounded-lg"
              src="https://t4.ftcdn.net/jpg/04/79/02/63/240_F_479026353_TMMzYidCPXUVjYWjzUMqRoWXQddZy10P.jpg"
              alt="people"
            />
          </div>
          <div className="md:mt-5 space-y-5">
            <h3 className="text-2xl lg:text-6xl font-bold text-gray-800 mb-5">
              Flexible work <span className="text-purple-900">opportunities</span>
            </h3>
            <p className="lg:w-md text-gray-500">
              Explore opportunities to work on your terms, offering flexibility
              in location, hours, and job roles that suit your lifestyle.
            </p>
            <div className="flex items-center justify-start gap-10">
              <div className="flex flex-col items-center">
                <p className="text-gray-500 text-sm font-medium">Users</p>
                <p className="text-center text-2xl font-bold text-gray-800">
                  100k
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-gray-500 text-sm font-medium">Job Vacancy</p>
                <p className="text-center text-2xl font-bold text-gray-800">
                  15k
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-gray-500 text-sm font-medium">Experience</p>
                <p className="text-center text-2xl font-bold text-gray-800">
                  5+ Years
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-purple-50">
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-2">
            A simple process to apply for a job
          </h1>
          <p className="text-gray-500 font-medium">
            Create an account, browse job listings, and apply in minutes
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step) => (
            <div
              key={step.h1}
              className="border-2 rounded-lg border-gray-800 shadow w-80 mx-auto p-5 hover:scale-102 hover:shadow-xl duration-300"
            >
              <div className="w-14 h-14 flex items-center justify-center border-2 border-purple-300 text-purple-800 rounded-full">
                {step.icon}
              </div>
              <div className="space-y-3 mt-4">
                <h1 className="text-xl font-semibold text-gray-800">
                  {step.h1}
                </h1>
                <p className="text-whit ">{step.p}</p>
                <Link
                  className="underline font-medium text-purple-800"
                  to="/{step.link}"
                >
                  {step.link}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding">
        <h3 className="text-2xl font-semibold text-gray-800">Trending Jobs</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5">
          <JobCard limit={3} />
        </div>
        <div className="flex justify-center mt-10">
          <Link
            to="/jobs"
            className="bg-purple-800 text-white py-2 px-8 rounded-full font-medium hover:scale-98 duration-200"
          >
            See All Jobs
          </Link>
        </div>
      </section>

      <section className="section-padding">
        <Reviews />
      </section>

      <section className="section-padding grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-800">
        <div className="space-y-10">
          <div className="space-y-4">
            <h4 className="bg-purple-200 w-fit py-1 px-2 text-sm text-purple-800 font-medium rounded-full ">
              Why WorkLink
            </h4>
            <h1 className="text-white text-2xl md:text-4xl font-medium lg:max-w-lg">
              Why WorkLink Is The Top Choice For Job Seekers{" "}
            </h1>
            <p className="text-white lg:max-w-md">
              Realizing dreams and shaping a better future through cooperation
              and mutual support
            </p>
          </div>
          <div className="flex flex-col gap-7">
            {mission.map((mission, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-5">
                <div className="w-15 h-15 p-5 rounded-full flex items-center justify-center bg-yellow-200 text-purple-800">
                  {mission.icon}
                </div>
                <div className="">
                  <h4 className="text-lg text-white font-semibold">
                    {mission.h}
                  </h4>
                  <p className="text-gray-500 font-medium  lg:max-w-md">
                    {mission.p}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <Link
              to="/register"
              className="py-3 px-8 bg-purple-200 rounded-full text-purple-800 font-medium"
            >
              Register Now
            </Link>
          </div>
        </div>
        <div>
          <img
            className="w-full rounded-lg sticky top-32"
            src="https://t4.ftcdn.net/jpg/04/98/72/91/240_F_498729118_RiwWjhYDF4LgfnfEL0WCh6Ls4oh0cHPV.jpg"
            alt=""
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="bg-purple-500 p-10 rounded-2xl max-w-4xl mx-auto">
          <div className="text-center mb-5">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 md:max-w-md mx-auto mb-5">
              Never Want to Miss Any Job News?
            </h1>
            <p className="text-white font">
              Subscribe to stay up-to-date on insights, events and new solutions.
            </p>
            <p className="text-white">
              You can unsubscribe at any time.
            </p>
          </div>
          <div className="bg-white mx-auto w-fit overflow-hidden rounded-full">
            <form onSubmit={handleSubscribe} action="">
              <div className="flex">
                <input
                  placeholder="Enter your address"
                  className="ps-4 md:w-80 outline-0 overflow-hidden"
                  type="email"
                  required
                />
                <button className="bg-gray-800 font-medium text-white rounded-e-full py-2 px-3 cursor-pointer">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
