import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiShieldFlashLine } from 'react-icons/ri';
import { BsChevronRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import AuthOffcanvas from '../auth/authOffcanvas';
import { logout } from '../../store/actions/authActions';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isAuthOffcanvasOpen, setIsAuthOffcanvasOpen] = useState(false);
  const openAuthOffcanvas = () => setIsAuthOffcanvasOpen(true);
  const closeAuthOffcanvas = () => setIsAuthOffcanvasOpen(false);

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const closeProfileMenu = () => setIsProfileMenuOpen(false);

  const dispatch = useDispatch();
  const { user } = useSelector(({ auth }) => auth);
  const { totalPaidAmount } = useSelector((state) => state.billings);

  const handleLogout = () => {
    closeProfileMenu();
    dispatch(logout());
    toast('Logged out successfully');
  };
  return (
    <>
      <AuthOffcanvas isOpen={isAuthOffcanvasOpen} close={closeAuthOffcanvas} />
      <nav className="sticky top-0 w-full border-b z-20 bg-white">
        <div className="2xl:container mx-auto">
          <div className="flex w-full justify-between items-center h-16 px-4 sm:px-6">
            <Link
              to="/"
              className="flex-shrink-0 text-neutral-800 flex gap-3 items-center"
            >
              <RiShieldFlashLine className="h-8 w-8" />
            </Link>
            <nav className="hidden md:flex space-x-10"></nav>
            <div className="flex gap-4 items-center justify-end">
              <h1 className="text-xl ">
                Paid:{' '}
                <span className="text-indigo-600">
                  {totalPaidAmount && totalPaidAmount[0].total}
                </span>
              </h1>
              {user ? (
                <div className="py-3 relative">
                  <button
                    type="button"
                    onClick={toggleProfileMenu}
                    className="inline-flex rounded-full items-center justify-center w-11 h-11 border border-transparent shadow-sm text-xl font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {user.name && user.name[0]}
                  </button>

                  <div
                    className={`${
                      isProfileMenuOpen
                        ? 'transform opacity-100 scale-100'
                        : 'transform opacity-0 scale-95 pointer-events-none'
                    } transition ease-out duration-100 origin-top-right absolute z-30 right-0 mt-2 rounded-2xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                  >
                    <div className="p-3 w-64 divide-y">
                      <div className="group relative p-2 mb-2 rounded-lg flex items-center space-x-2">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-full flex items-center justify-center bg-indigo-500 text-white text-xl">
                            {user.name && user.name[0]}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate">{user.name}</p>
                          <p className="truncate text-sm text-gray-600">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={handleLogout}
                          className="mt-1 flex w-full items-center justify-between p-3 hover:bg-gray-100 rounded-lg"
                        >
                          <p className="flex items-center gap-2">
                            <span className="text-sm">Log out</span>
                          </p>
                          <BsChevronRight />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={openAuthOffcanvas}
                  className="relative uppercase group text-lg text-neutral-800"
                >
                  <span className="w-0 group-hover:w-[100%] absolute bottom-0.5 h-[2px] transition-all duration-300 bg-indigo-500"></span>
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
