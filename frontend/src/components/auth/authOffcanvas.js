import { useState } from 'react';

import { RiShieldFlashLine } from 'react-icons/ri';
import { FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const AuthOffcanvas = ({ isOpen, close }) => {
  const [activeForm, setActiveForm] = useState('login');
  return (
    <div className={`${!isOpen && 'pointer-events-none'} fixed inset-0 z-40`}>
      <div
        onClick={close}
        className={`${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } fixed inset-0 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 transition-opacity`}
      ></div>
      <nav
        className={`${
          isOpen
            ? 'transform opacity-100 translate-x-0'
            : 'transform opacity-0 translate-x-full'
        } transition ease-[cubic-bezier(0.76, 0, 0.24, 1)] duration-300 fixed z-40 inset-0 h-full w-full bg-white inset-y-0 shadow-lg left-auto right-0 max-w-md px-4 sm:px-6`}
      >
        <div className="h-16 w-full flex items-center justify-between">
          <Link to="/">
            <RiShieldFlashLine className="w-8 h-8" />
          </Link>
          <button
            type="button"
            onClick={close}
            className="-mr-2 hover:rotate-90 transition inline-flex items-center justify-center p-2 rounded-md"
          >
            <FiX className="block h-10 w-10 stroke-[1]" />
          </button>
        </div>
        <div className="mt-2">
          {activeForm === 'login' ? (
            <Login close={close} />
          ) : (
            <Register close={close} />
          )}
        </div>
        <div className="py-3">
          <button
            type="button"
            onClick={() =>
              setActiveForm(activeForm === 'login' ? 'register' : 'login')
            }
            className="inline-flex justify-center text-sm font-medium hover:underline text-indigo-500"
          >
            {activeForm === 'login'
              ? 'Dont have an account? Register'
              : 'Already registered? Login'}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AuthOffcanvas;
