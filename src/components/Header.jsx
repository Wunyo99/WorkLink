import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Find Jobs", path: "/jobs" },
    { name: "Contact", path: "/contact" },
  ];

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white font-bold"
      : "text-black font-medium hover:text-white transition duration-300";
  return (
    <>
      <header
        style={{
          background:
            "linear-gradient(to right, rgba(88, 28, 135, 0.95) 0%, rgba(88, 28, 135, 0.7) 35%, rgba(88, 28, 135, 0.2) 60%, rgba(88, 28, 135, 0) 100%)",
        }}
        className="bg-white z-100 sticky top-0 py-5 px-10"
      >
        <div className="flex items-center justify-between">
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
              <Link to="/login" className="text-white font-semibold">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white rounded-lg text-purple-800 font-semibold py-2 px-5"
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
