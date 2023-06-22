import React, { useContext, useState, useEffect } from 'react';
import Layout from '../Layouts/Layout';
import axios from 'axios';
import { ReceiptContext } from '../../contextApis/ReceiptContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { DisplayMonthOfTheYear } from '../utils/DisplayMonthOfTheYear';
//
const Dashboard = () => {
  //
  const navigate = useNavigate();
  const { receiptFormData, setReceiptFormData } = useContext(ReceiptContext);
  const url = process.env.REACT_APP_SERVER_ENDPOINT_URL;
  const [receiptResponse, setreceiptResponse] = useState({});
  const [allReceipts, setallReceipts] = useState([]);
  const [isAllreceiptsSet, setisAllreceiptsSet] = useState(false);
  const [isGotten, setIsgotten] = useState(false);
  const [searchValue, setsearchValue] = useState('');

  useEffect(() => {
    const getAllReceipts = async () => {
      const all = await axios.get(`${url}receipt`);
      const result = await all.data;
      setallReceipts(result.data);
      setisAllreceiptsSet(true);
    };
    getAllReceipts();
  }, []);
  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const receipt = await axios.get(`${url}receipt/${searchValue}`);
    const result = await receipt.data;
    setreceiptResponse(result.data);

    setIsgotten(true);
    setsearchValue('');
    setReceiptFormData(receiptResponse);
    console.log(receiptFormData);
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setsearchValue(value);
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
            <div className='row'>
              <div className='col-xl-4 col-md-6'>
                <div className='card bg-primary text-white mb-4'>
                  <div className='card-body'>Uploaded Receipt</div>
                  <div className='card-footer d-flex align-items-center justify-content-between'>
                    <a
                      className='small text-white stretched-link'
                      href='/index'
                    >
                      0
                    </a>
                    <div className='small text-white'>
                      <i className='fas fa-angle-right'></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xl-4 col-md-6'>
                <div className='card bg-warning text-white mb-4'>
                  <div className='card-body'>Years Data</div>
                  <div className='card-footer d-flex align-items-center justify-content-between'>
                    <a
                      className='small text-white stretched-link'
                      href='/index'
                    >
                      0
                    </a>
                    <div className='small text-white'>
                      <i className='fas fa-angle-right'></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
              <div className='border-t border-gray-200'>
                {/* Sea */}
                <div className='row p-[19px] justify-content-center align-items-center'>
                  <form className='row' onSubmit={handleSubmit}>
                    <div className='col-md-7'>
                      <input
                        type='month'
                        className='form-control'
                        id='inputDate'
                        name='month'
                        onChange={handleChange}
                        required={true}
                      />
                    </div>
                    <div className='col-md-2'>
                      <button type='submit' className='btn btn-primary col-10'>
                        Search
                      </button>
                    </div>
                  </form>
                </div>
                <dl>
                  <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6'>
                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                      <ul
                        role='list'
                        className='divide-y divide-gray-200 rounded-md border border-gray-200'
                      >
                        {isGotten ? (
                          <li
                            className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'
                            key={receiptResponse.id}
                          >
                            <div className='flex w-0 flex-1 items-center'>
                              <svg
                                className='h-5 w-5 flex-shrink-0 text-gray-400'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                aria-hidden='true'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z'
                                  clipRule='evenodd'
                                />
                              </svg>
                              <span className='ml-2 w-0 flex-1 truncate'>
                                Receipt voucher for{' '}
                                {DisplayMonthOfTheYear(
                                  receiptResponse?.monthYear.slice(5)
                                )}
                              </span>
                            </div>
                            <div className='ml-4 flex-shrink-0'>
                              <a
                                href={`/receipt/${receiptResponse.monthYear}`}
                                className='font-medium text-indigo-600 hover:text-indigo-500'
                              >
                                {' '}
                                <VisibilityIcon
                                  style={{ color: 'blue' }}
                                />{' '}
                              </a>
                            </div>
                          </li>
                        ) : (
                          allReceipts?.map((receipt) => (
                            <li
                              className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'
                              key={receipt.id}
                            >
                              <div className='flex w-0 flex-1 items-center'>
                                <svg
                                  className='h-5 w-5 flex-shrink-0 text-gray-400'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                  aria-hidden='true'
                                >
                                  <path
                                    fillRule='evenodd'
                                    d='M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z'
                                    clipRule='evenodd'
                                  />
                                </svg>
                                <span className='ml-2 w-0 flex-1 truncate'>
                                  Receipt voucher for{' '}
                                  {DisplayMonthOfTheYear(
                                    receipt?.monthYear.slice(5)
                                  )}
                                </span>
                              </div>
                              <div className='ml-4 flex-shrink-0'>
                                <a
                                  href={`/receipt/${receipt.monthYear}`}
                                  className='font-medium text-indigo-600 hover:text-indigo-500'
                                >
                                  {' '}
                                  <VisibilityIcon
                                    style={{ color: 'blue' }}
                                  />{' '}
                                </a>
                              </div>
                            </li>
                          ))
                        )}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Dashboard;
