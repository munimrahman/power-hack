import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, registerUser } from '../../store/actions/authActions';

const Register = ({ close }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = user;

  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      toast.success('You are logged in');
      close();
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
    };

    dispatch(registerUser(userData));
  };

  return (
    <form className="mt-2" onSubmit={handleSubmit}>
      <div>
        <div className="py-5 bg-white">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                name="name"
                value={name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                id="name"
                autoComplete="given-name"
                placeholder="John Doe"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="col-span-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                name="email"
                value={email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                id="email"
                autoComplete="email"
                placeholder="example@mail.com"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="col-span-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                name="password"
                value={password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                id="password"
                placeholder="********"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="py-3">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-10 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Loading...' : 'Register'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
