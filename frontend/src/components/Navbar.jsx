import { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";

import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setMobileMenuOpen(false);
    logout();
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/5 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link
            to="/"
            className="text-xl font-bold text-white drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]"
          >
            PRINTit
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-md p-2 text-gray-700"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop Menu */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-10">
          <Link
            to="/"
            className="text-sm font-semibold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] hover:text-indigo-300 transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-sm font-semibold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] hover:text-indigo-300 transition"
          >
            About Us
          </Link>
          <Link
            to="/services"
            className="text-sm font-semibold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] hover:text-indigo-300 transition"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="text-sm font-semibold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] hover:text-indigo-300 transition"
          >
            Contact
          </Link>
        </PopoverGroup>

        {/* Right Side */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="rounded-md bg-indigo-500/90 px-4 py-2 text-white shadow-lg shadow-indigo-500/40 hover:bg-indigo-400 transition"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="rounded-md bg-indigo-500/90 px-4 py-2 text-white shadow-lg shadow-indigo-500/40 hover:bg-indigo-400 transition"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-semibold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] hover:text-indigo-300 transition"
              >
                Dashboard
              </Link>

              {/* Profile Dropdown */}
              <Popover className="relative">
                <PopoverButton className="flex items-center gap-1 text-sm font-semibold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] hover:text-indigo-300 transition">
                  Profile
                  <ChevronDownIcon className="h-4 w-4" />
                </PopoverButton>

                <PopoverPanel className="absolute right-0 mt-2 w-40 rounded-md bg-gray-900 text-white shadow-xl ring-1 ring-white/10 z-50">
                  <div className="flex flex-col">
                    <Link
                      to="/profile"
                      className="px-4 py-2 text-white transition
             hover:text-indigo-300
             hover:drop-shadow-[0_0_6px_rgba(99,102,241,0.7)]"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-white transition
             hover:text-indigo-300
             hover:drop-shadow-[0_0_6px_rgba(99,102,241,0.7)]"
                    >
                      Logout
                    </button>
                  </div>
                </PopoverPanel>
              </Popover>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50 bg-black/30" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full bg-white p-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-lg font-bold">
              PRINTit
            </Link>
            <button onClick={() => setMobileMenuOpen(false)}>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
              About Us
            </Link>
            <Link to="/services" onClick={() => setMobileMenuOpen(false)}>
              Services
            </Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>

            <hr />

            {!isAuthenticated ? (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  Sign in
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </Link>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  Profile
                </Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
