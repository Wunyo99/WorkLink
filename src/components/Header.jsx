import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Find Jobs", path: "/jobs" },
    { name: "Contact", path: "/contact" },
  ];

    useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    isActive
      ? " font-bold text-yellow-200 text-lg"
      : "text-white font-medium hover:text-yellow-200 transition duration-300";


  const headerBg =
    "linear-gradient(to right, rgba(88, 28, 135, 0.95) 0%, rgba(88, 28, 135, 0.7) 35%, rgba(88, 28, 135, 0.2) 60%, rgba(88, 28, 135, 0) 100%)";

  return (
    <>
      <header
        style={{
          background: `${isScrolled ? headerBg : ""}`,
        }}
        className={`top-0 sticky w-full z-100 py-5 px-10 overflow-hidden ${isScrolled ? "backdrop-blur-3xl" : ""} `}
      >
        <div className="flex items-center justify-between ">
          <div className="text-gray-800 text-2xl lg:text-4xl font-bold logo">
            <a href="/">
              {" "}
              <span className="text-white">Work</span>-Link
            </a>
          </div>

          <nav className="gap-6 hidden md:flex">
            {navLinks.map((navLink) => (
              <NavLink
                key={navLink.name}
                to={navLink.path}
                className={linkClass}
              >
                {navLink.name}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex">
            <div className="flex items-center gap-4">
              <Link to="/login" className="font-bold tracking-wider text-black  ">
                Login
              </Link>
              <Link
                to="/register"
                className={`bg-purple-600 rounded-lg text-white font-semibold py-2 px-5 hover:scale-98 duration-200 `}
              >
                Register
              </Link>
            </div>
          </div>

          <div className=" md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mt-5">
            <div className="py-2 md:flex">
              <div className="flex items-center gap-4">
                <Link to="/login" className="font-semibold ">
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`bg-purple-600 rounded-lg text-white font-semibold py-2 px-5 hover:scale-98 duration-200 `}
                >
                  Register
                </Link>
              </div>
            </div>
            <nav className="flex flex-col gap-2 ">
              {navLinks.map((navLink) => (
                <NavLink
                  key={navLink.name}
                  to={navLink.path}
                  className={linkClass}
                >
                  {navLink.name}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
