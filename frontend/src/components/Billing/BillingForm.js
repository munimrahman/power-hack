import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewBilling,
  clearErrors,
  updateBillingData,
} from '../../store/actions/billingActions';
import { toast } from 'react-toastify';
import {
  NEW_BILLING_RESET,
  UPDATE_BILLING_RESET,
} from '../../store/constants/billingConstants';

const BillingForm = ({ close, updateBilling, updateData }) => {
  const { isUpdating, billing } = updateBilling;

  const [billingData, setBillingData] = useState({
    fullname: '',
    email: '',
    phone: '',
    paidAmount: '',
  });
  const { fullname, email, phone, paidAmount } = billingData;

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newBilling);
  const { loading: updateloading, isUpdated } = useSelector(
    (state) => state.billingAction
  );

  useEffect(() => {
    isUpdating
      ? setBillingData({
          fullname: billing.fullname,
          email: billing.email,
          phone: billing.phone,
          paidAmount: billing.paidAmount,
        })
      : setBillingData({
          fullname: '',
          email: '',
          phone: '',
          paidAmount: '',
        });
  }, [billing, isUpdating]);

  useEffect(() => {
    if (isUpdated) {
      toast.success('Billing updated successfully');
      dispatch({ type: UPDATE_BILLING_RESET });
      close();
      updateData();
    }
  }, [updateData, isUpdated, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success('Billing added successfully');
      dispatch(clearErrors());
      close();
      dispatch({ type: NEW_BILLING_RESET });
    }
  }, [error, success]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isUpdating) {
      dispatch(updateBillingData(billing._id, billingData));
    } else {
      dispatch(addNewBilling(billingData));
      updateData();
    }
  };
  return (
    <form className="mt-2" onSubmit={handleSubmit}>
      <div>
        <div className="py-5 bg-white">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6">
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                name="fullname"
                id="fullname"
                value={fullname}
                onChange={(e) =>
                  setBillingData({
                    ...billingData,
                    fullname: e.target.value,
                  })
                }
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
                id="email"
                value={email}
                onChange={(e) =>
                  setBillingData({
                    ...billingData,
                    email: e.target.value,
                  })
                }
                autoComplete="email"
                placeholder="example@mail.com"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="col-span-6">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) =>
                  setBillingData({
                    ...billingData,
                    phone: e.target.value,
                  })
                }
                autoComplete="tel"
                placeholder="01#########"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="col-span-6">
              <label
                htmlFor="paidAmount"
                className="block text-sm font-medium text-gray-700"
              >
                Paid Amount<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                name="paidAmount"
                id="paidAmount"
                value={paidAmount}
                onChange={(e) =>
                  setBillingData({
                    ...billingData,
                    paidAmount: e.target.value,
                  })
                }
                placeholder="0.00"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="py-3 text-right">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-10 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isUpdating ? 'Update billing' : 'Add billing'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default BillingForm;
