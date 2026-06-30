import { NavLink, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, User, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { user, profile, loading } = useContext(AuthContext);
  console.log(user);
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Find Jobs", path: "/jobs" },
    { name: "Contact", path: "/contact" },
  ];

  const location = useLocation();

  const isHome = location.pathname === "/";

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

  const showHeaderBg = !isHome || isScrolled;

  const headerBg =
    "linear-gradient(to right, rgba(88, 28, 135, 0.95) 0%, rgba(88, 28, 135, 0.7) 35%, rgba(88, 28, 135, 0.2) 60%, rgba(88, 28, 135, 0) 100%)";

  return (
    <>
      <header
        style={{
          background: showHeaderBg ? headerBg : "transparent",
        }}
        className={`top-0 sticky w-full z-100 py-5 px-10 overflow-hidden ${isScrolled ? "backdrop-blur-3xl" : ""} `}
      >
        <div className="flex items-center justify-between ">
          <div className="text-gray-800 text-2xl lg:text-3xl font-bold logo">
            <a href="/">
              {" "}
              <span className="text-white">Work</span>Link
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
            {user ? (
              <Link to="/profile">
                <div className="bg-purple-800 flex items-center gap-4 pe-4 rounded-full">
                  <div className="bg-yellow-200 p-1 rounded-full">
                    <User />
                  </div>
                  <p className="text-white font-medium">
                    {/* {user.firstname.charAt(0)}
                    {user.lastname.charAt(0)} */}
                    {user.firstname}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="font-bold tracking-wider text-black  "
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`bg-purple-600 rounded-lg text-white font-semibold py-2 px-5 hover:scale-98 duration-200 `}
                >
                  Register
                </Link>
              </div>
            )}
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
                {user ? (
                  <Link to="/profile">
                    <div className="bg-purple-800 flex items-center gap-4 pe-4 rounded-full">
                      <div className="bg-yellow-200 p-1 rounded-full">
                        <User />
                      </div>
                      <p className="text-white font-medium">
                        {user.firstname.charAt(0)}
                        {user.lastname.charAt(0)}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-center gap-4">
                    <Link
                      to="/login"
                      className="font-bold tracking-wider text-black  "
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className={`bg-purple-600 rounded-lg text-white font-semibold py-2 px-5 hover:scale-98 duration-200 `}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <nav className="flex flex-col gap-2 mt-2 ">
              {navLinks.map((navLink) => (
                <NavLink
                  key={navLink.name}
                  to={navLink.path}
                  className={linkClass}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
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
