import { MapPin, PhoneCall, Mail } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router";
const Footer = () => {
  return (
    <footer className="footer p-8 md:p-15 bg-gray-900">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center">
        <div className="w-full">
          <div className="logo flex items-center gap-2 text-white mb-2">
            <i className="fa-solid fa-scissors rotate-270 text-3xl"></i>
            <a href="#" className="text-3xl font-bold">
              WorkLink
            </a>
          </div>
          <p className="text-base leading-relaxed text-gray-300 mb-4">
            Discover thousands of job opportunities from top companies.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/me/"
              className="w-10 h-10 bg-gray-200 border border-white flex items-center justify-center text-xl text-purple-900 rounded-full hover:bg-yellow-200 transition duration-500"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-gray-200 border border-white flex items-center justify-center text-xl text-purple-900 rounded-full hover:bg-yellow-200 transition duration-500"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/mawunyo.anani/"
              className="w-10 h-10 bg-gray-200 border border-white flex items-center justify-center text-xl text-purple-900 rounded-full hover:bg-yellow-200 transition duration-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com/@MawunyoAnani-vz1bs"
              className="w-10 h-10 bg-gray-200 border border-white flex items-center justify-center text-xl text-purple-900 rounded-full hover:bg-yellow-200 transition duration-500"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        <div>
          <ul className="text-gray-300 flex flex-col space-y-2">
            <Link
              className="text-base capitalize hover:text-yellow-200 transition duration-500"
              to="/"
              href="/home"
            >
              home
            </Link>
            <Link
              className="text-base capitalize hover:text-yellow-200 transition duration-500"
              to="/"
              href="/admissions"
            >
              Find Jobs
            </Link>
            <Link
              className="text-base capitalize hover:text-yellow-200 transition duration-500"
              to="/"
              href="/facilities"
            >
              Partners
            </Link>
            <Link
              className="text-base capitalize hover:text-yellow-200 transition duration-500"
              to="/"
              href="/staff"
            >
              Blog
            </Link>
          </ul>
        </div>

        <div>
          <ul className="text-gray-300 flex flex-col space-y-2">
            <Link
              className="text-base capitalize hover:text-yellow-200 transition duration-500"
              to="/"
            >
              Job Referrals
            </Link>
            <Link
              className="text-base capitalize hover:text-yellow-200 transition duration-500"
              to="/"
            >
              Contact Us
            </Link>
            <Link
              className="text-base capitalize hover:text-yellow-200 transition duration-500"
              to="/"
            >
              Help
            </Link>
          </ul>
        </div>

        <div>
          <ul className="space-y-5">
            <li className="text-gray-300 flex items-center gap-3">
              <MapPin className="text-white" />
              Accra, Ghana
            </li>
            <li className="text-gray-300 flex items-center gap-3">
              <PhoneCall className="text-white" />
              (+233) 245 494 534
            </li>
            <li className="text-gray-300 flex items-center gap-3">
              <Mail className="text-white" />
              worklink@gmail.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white flex justify-between mt-10 pt-6 text-center text-white">
        <p> © {new Date().getFullYear()} WorkLink. All Rights Reserved</p>
        <div className="flex gap-4">
          <p>Terms</p>
          <p>Privacy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
