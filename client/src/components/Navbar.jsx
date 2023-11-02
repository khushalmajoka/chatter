import { useContext, useState } from "react";
import logo from "../assets/logo.png";
import userImage from "../assets/user.png";
import darkmode from "../assets/dark-mode.png";
import lightmode from "../assets/light-mode.png";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { user, darkMode, updateDarkMode } = useContext(AuthContext);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsUserMenuOpen(false);
    window.location.href = "/login";
  };

  const toggleDarkMode = () => {
    if (!darkMode) {
      document.getElementsByTagName("html")[0].classList.add("dark");
      localStorage.setItem("darkMode", true);
      updateDarkMode(true);
    } else {
      document.getElementsByTagName("html")[0].classList.remove("dark");
      localStorage.setItem("darkMode", false);
      updateDarkMode(false);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center">
          <img src={logo} className="h-8 mr-3" alt="Chatter Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Chatter
          </span>
        </a>
        {
          <div className="flex items-center gap-2 md:order-2">
            <button
              type="button"
              className="flex mr-3 text-sm rounded-full md:mr-0"
              id="user-menu-button"
              onClick={toggleDarkMode}
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-10 h-10 rounded-full scale-75"
                src={darkMode ? lightmode : darkmode}
                alt="mode"
              />
            </button>
            {user && (
              <div className="flex items-center md:order-2">
                <button
                  type="button"
                  className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  onClick={toggleUserMenu}
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-10 h-10 rounded-full scale-75"
                    src={userImage}
                    alt="user photo"
                  />
                </button>
                {isUserMenuOpen && (
                  <div
                    className="fixed mt-44 -ml-[7rem] text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="user-dropdown"
                  >
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900 dark:text-white">
                        {user.name}
                      </span>
                      <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                        {user.email}
                      </span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li onClick={handleLogout}>
                        <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                          Logout
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
                <button
                  data-collapse-toggle="navbar-user"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-user"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        }
      </div>
    </nav>
  );
};

export default Navbar;
