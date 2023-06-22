import React from 'react';
import Layout from '../Layouts/Layout';
import { useState } from 'react';
import axios from 'axios';
import { printArea } from '../utils/PrintAreaFunction';
import { useNavigate } from 'react-router-dom';
import { DisplayMonthOfTheYear } from '../utils/DisplayMonthOfTheYear';
// import '../styles/printSheet.css';

const FilterReceiptYear = () => {
  //
  const navigate = useNavigate();
  const url = process.env.REACT_APP_SERVER_ENDPOINT_URL;
  const [filteredReceipt, setfilteredReceipt] = useState([]);
  const [isGotten, setIsgotten] = useState(false);
  const [searchValue, setsearchValue] = useState('');
  const [serverResponse, setserverResponse] = useState('');

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get(`${url}receipt/filter/${searchValue}`);
    const result = await res.data;
    setfilteredReceipt(result.data);
    setserverResponse(result?.data?.message);
    setIsgotten(true);
    setsearchValue('');
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setsearchValue(value);
  };

  const printReceipt = () => {
    printArea('printableArea');
  };

  return (
    <>
      <Layout>
        <main>
          <div className='container-fluid px-4'>
            <h1 className='mt-4'>Dashboard</h1>
            <ol className='breadcrumb mb-4'>
              <li className='breadcrumb-item active'>Dashboard</li>
            </ol>
            <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
              <div className='border-t border-gray-200'>
                {/* Sea */}
                <div className='row p-[19px] justify-content-center align-items-center'>
                  <form className='row' onSubmit={handleSubmit}>
                    <div className='col-md-7'>
                      <input
                        type='text'
                        className='form-control'
                        id='inputDate'
                        name='month'
                        onChange={handleChange}
                        required={true}
                        placeholder='Enter the year in format: 2023'
                      />
                    </div>
                    <div className='col-md-2'>
                      <button type='submit' className='btn btn-primary col-10'>
                        Search
                      </button>
                    </div>
                  </form>
                </div>
                {/* Table data */}
                <div className='flex flex-col'>
                  <div className=' sm:mx-0.5 lg:mx-0.5'>
                    <div
                      className='py-2 inline-block min-w-full sm:px-6 lg:px-8 overflow-x-auto'
                      id='printableArea'
                    >
                      <div className='overflow-hidden'>
                        {isGotten ? (
                          <table className='min-w-full'>
                            <thead className='bg-gray-200 border-b'>
                              <tr>
                                <th
                                  scope='col'
                                  className='text-sm font-medium text-gray-900 px-2 py-2 text-left'
                                >
                                  S/N
                                </th>
                                <th
                                  scope='col'
                                  className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                                >
                                  Treasury Station
                                </th>
                                <th
                                  scope='col'
                                  className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                                >
                                  Month
                                </th>
                                <th
                                  scope='col'
                                  className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                                >
                                  Year
                                </th>
                                <th
                                  scope='col'
                                  className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                                >
                                  Name of payer
                                </th>
                                <th
                                  scope='col'
                                  className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                                >
                                  Address
                                </th>
                                <th
                                  scope='col'
                                  className='text-sm font-medium text-gray-900 text-left'
                                  colSpan={2}
                                >
                                  <tr
                                    scope='col'
                                    className='text-sm font-medium text-gray-900  text-left'
                                    colSpan={2}
                                  >
                                    <th
                                      scope='col'
                                      className='text-sm font-medium text-gray-900 px-6 py-4 text-left border-0'
                                    >
                                      Code head
                                    </th>
                                    <th
                                      scope='col'
                                      className='text-sm font-medium text-gray-900 px-6 py-4 text-left border-0'
                                    >
                                      Code subhead
                                    </th>
                                  </tr>
                                </th>
                                <th
                                  scope='col'
                                  className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                                >
                                  Particulars of payment
                                </th>
                                <th
                                  scope='col'
                                  className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                                >
                                  Description
                                </th>
                                <th
                                  scope='col'
                                  className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                                >
                                  No people
                                </th>
                                <th
                                  scope='col'
                                  className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                                >
                                  Amount paid(N)
                                </th>
                                <th
                                  scope='col'
                                  className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                                >
                                  Date
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {isGotten && filteredReceipt.length > 0 ? (
                                filteredReceipt.map((receipt, index) => (
                                  <tr className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                                      {index + 1}
                                    </td>
                                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                                      {receipt?.station}
                                    </td>
                                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                                      {DisplayMonthOfTheYear(
                                        receipt?.monthYear.slice(5)
                                      )}
                                    </td>
                                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                                      {receipt?.Year}
                                    </td>
                                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                                      {receipt?.payer}
                                    </td>
                                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                                      {receipt?.address}
                                    </td>
                                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                                      {receipt?.head}
                                    </td>
                                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                                      {receipt?.subhead}
                                    </td>
                                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                                      {receipt?.particulars}
                                    </td>
                                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                                      {receipt?.description}
                                    </td>
                                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                                      {receipt?.amount / 3000}
                                    </td>
                                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                                      {receipt?.amount}
                                    </td>
                                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                                      {receipt?.monthYear}
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <p className='w-[70%] m-auto text-4xl text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                                  {serverResponse}{' '}
                                </p>
                              )}
                            </tbody>
                          </table>
                        ) : (
                          ''
                        )}
                        {isGotten && filteredReceipt.length > 0 ? (
                          <button
                            type='button'
                            className='btn btn-success col-1 ml-[18px] my-[32px]'
                            onClick={printReceipt}
                          >
                            Print
                          </button>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* End of table data */}
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default FilterReceiptYear;
