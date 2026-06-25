import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="h-screen flex items-center justify-center md:justify-start overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://t3.ftcdn.net/jpg/04/14/45/68/240_F_414456803_rsVip8ZydnrsbGVdawBvlsKynv90KYS2.jpg')",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(88, 28, 135, 0.95) 0%, rgba(88, 28, 135, 0.7) 35%, rgba(88, 28, 135, 0.2) 60%, rgba(88, 28, 135, 0) 100%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-2xl px-6 md:px-15 text-center md:text-start space-y-10 z-10"
        >
          <h1 className="text-4xl md:text-6xl text-white font-bold">
            Get the <span className="text-yellow-200">right job</span> you
            deserve
          </h1>

          <p className="text-white/90 font-medium text-xl">
            Discover thousands of job opportunities from top companies. Apply in
            minutes and take the next step in your career
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-5">
            <Link
              to="/jobs"
              className="flex items-center gap-2 text-purple-900 bg-white py-4 px-10 rounded-2xl font-medium hover:bg-yellow-200 duration-300"
            >
              <Search />
              <span>Find Jobs</span>
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
