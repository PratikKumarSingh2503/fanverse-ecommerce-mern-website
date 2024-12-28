import React, { useState } from "react";
import logo from "../Image/logo.png";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import toast from "react-hot-toast";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const cartItemNumber = useSelector((state) => state.product.cartItem);

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout Successfully");
    setShowMenu(false); // Close account menu on logout
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false); // Close mobile menu after clicking any link
  };

  return (
    <header className="fixed shadow-md w-full h-16 px-4 z-50 bg-white transition-all duration-500 ease-in-out">
      <div className="flex items-center justify-between h-full">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Enigma Vault"
            className="h-10 hover:scale-110 transition-transform duration-300"
          />
          <p className="ml-2 text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            Enigma Vault
          </p>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <Link
            to="/"
            className="hover:text-blue-500 hover:underline underline-offset-4 transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/menu/6519c8d1fa9856a0bf542ac8"
            className="hover:text-blue-500 hover:underline underline-offset-4 transition-all duration-300"
          >
            Menu
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-500 hover:underline underline-offset-4 transition-all duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-blue-500 hover:underline underline-offset-4 transition-all duration-300"
          >
            Contact
          </Link>
        </nav>

        {/* Cart and Profile for Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/cart" className="relative text-2xl text-slate-600">
            <BsCartFill className="hover:text-blue-500 transition-colors duration-300" />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {cartItemNumber.length}
            </div>
          </Link>
          <div
            className="relative text-slate-600 cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          >
            {userData.image ? (
              <img
                src={userData.image}
                alt="User"
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <HiOutlineUserCircle className="text-3xl" />
            )}
            {showMenu && (
              <div className="absolute right-0 top-full mt-2 bg-white shadow-md rounded-lg py-2 w-40">
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to="/newproduct"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    New Product
                  </Link>
                )}
                {userData.image ? (
                  <p
                    onClick={handleLogout}
                    className="block px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout ({userData.firstName})
                  </p>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile View */}
        <div className="flex md:hidden items-center gap-4">
          <Link to="/cart" className="relative text-2xl text-slate-600">
            <BsCartFill className="hover:text-blue-500 transition-colors duration-300" />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {cartItemNumber.length}
            </div>
          </Link>
          <div
            className="relative text-slate-600 cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          >
            {userData.image ? (
              <img
                src={userData.image}
                alt="User"
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <HiOutlineUserCircle className="text-3xl" />
            )}
            {showMenu && (
              <div className="absolute right-0 top-full mt-2 bg-white shadow-md rounded-lg py-2 w-40">
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to="/newproduct"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={closeMobileMenu}
                  >
                    New Product
                  </Link>
                )}
                {userData.image ? (
                  <p
                    onClick={handleLogout}
                    className="block px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout ({userData.firstName})
                  </p>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
          <button
            className="text-2xl text-slate-600"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white/50 backdrop-blur-md shadow-lg rounded-lg mt-2 py-2 text-right transition-all duration-900">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/menu/6519c8d1fa9856a0bf542ac8"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={closeMobileMenu}
          >
            Menu
          </Link>
          <Link
            to="/about"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={closeMobileMenu}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={closeMobileMenu}
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
