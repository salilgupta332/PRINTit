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
    <header className="sticky top-0 z-50 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="text-xl font-bold">
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
          <Link to="/" className="font-semibold">
            Home
          </Link>
          <Link to="/about" className="font-semibold">
            About Us
          </Link>
          <Link to="/services" className="font-semibold">
            Services
          </Link>
          <Link to="/contact" className="font-semibold">
            Contact
          </Link>
        </PopoverGroup>

        {/* Right Side */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="font-semibold">
                Sign in
              </Link>
              <Link
                to="/signup"
                className="rounded-md bg-indigo-600 px-4 py-2 text-white"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="font-semibold">
                Dashboard
              </Link>

              {/* Profile Dropdown */}
              <Popover className="relative">
                <PopoverButton className="flex items-center gap-1 font-semibold">
                  Profile
                  <ChevronDownIcon className="h-4 w-4" />
                </PopoverButton>

                <PopoverPanel className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow">
                  <div className="flex flex-col">
                    <Link
                      to="/profile"
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-left hover:bg-gray-100"
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
