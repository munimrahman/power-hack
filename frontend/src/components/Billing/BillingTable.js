import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  deleteBilling,
  getBillings,
  updateBilling,
} from '../../store/actions/billingActions';
import BillingOffcanvas from './BillingOffcanvas';
import BillingPagination from './BillingPagination';
import BillingsListSkeleton from './BillingsSkeleton';

const BillTable = () => {
  const [isBillOffcanvasOpen, setIsBillOffcanvasOpen] = useState(false);
  const openBillOffcanvas = () => setIsBillOffcanvasOpen(true);
  const closeBillOffcanvas = () => setIsBillOffcanvasOpen(false);

  const [updateBilling, setUpdateBilling] = useState({
    isUpdating: false,
    billing: {},
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [trigger, setTrigger] = useState(false);
  const updateData = () => setTrigger(!trigger);
  let { keyword, page = 1 } = useParams();
  page = Number(page);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { billings, loading, error, resPerPage, filteredBillingsCount } =
    useSelector((state) => state.billings);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
    let url = window.location.search;
    if (url.includes('location')) {
      url.includes('&page')
        ? (url = url.replace(/(page=)[^\&]+/, '$1' + pageNumber))
        : (url = url.concat(`&page=${pageNumber}`));

      navigate(url);
    } else {
      navigate(`/?page=${pageNumber}`);
    }
  };

  useEffect(() => {
    if (error) {
      return toast.error(error);
    }
    dispatch(getBillings(keyword, currentPage));
  }, [dispatch, keyword, currentPage, error, trigger]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this billing?'
    );
    if (confirmDelete) {
      dispatch(deleteBilling(id));
      updateData();
    } else {
      return;
    }
  };

  return (
    <>
      <BillingOffcanvas
        isOpen={isBillOffcanvasOpen}
        close={closeBillOffcanvas}
        updateData={updateData}
        updateBilling={updateBilling}
      />
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Headaer */}
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Billings</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage your billings and payments.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={() => {
                openBillOffcanvas();
                setUpdateBilling({
                  isUpdating: false,
                  billing: {},
                });
              }}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add New Bill
            </button>
          </div>
        </div>
        {/* Table */}
        <div className="mt-8 flex flex-col gap-6">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                {loading ? (
                  <BillingsListSkeleton />
                ) : (
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr className="divide-x divide-gray-200">
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Billing ID
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Full Name
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Paid Amount
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {billings.map((billing, index) => (
                        <tr key={index} className="divide-x divide-gray-200">
                          <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                            {billing._id}
                          </td>
                          <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                            {billing.fullname}
                          </td>
                          <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                            {billing.email}
                          </td>
                          <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                            {billing.paidAmount}
                          </td>
                          <td className="whitespace-nowrap space-x-3 py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
                            <button
                              onClick={() => {
                                openBillOffcanvas();
                                setUpdateBilling({
                                  isUpdating: true,
                                  billing: billing,
                                });
                              }}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(billing._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
          {/* Pagination */}
          <BillingPagination
            activePage={currentPage}
            resPerPage={resPerPage}
            totalItemsCount={filteredBillingsCount}
            handlePagination={handlePagination}
          />
        </div>
      </div>
    </>
  );
};

export default BillTable;
