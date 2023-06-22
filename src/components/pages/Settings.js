import React, { useState } from 'react';
import Layout from '../Layouts/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';

const Settings = () => {
  const [errorMessage, seterrorMessage] = useState('');
  const [updateData, setupdateData] = useState({});
  const url = process.env.REACT_APP_SERVER_ENDPOINT_URL;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setupdateData({ ...updateData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !updateData.newPassword ||
        !updateData.username ||
        !updateData.oldPassword
      ) {
        seterrorMessage('All fields are required***');
        return;
      }
      // axios call
      const updateUserData = await axios.post(
        `${url}login/updateLogin`,
        updateData
      );
      const result = await updateUserData.data;
      const res = await result.message;
      updateUserData.status === 200 ? toast.success(res) : toast.error(res);
      updateData.newPassword =
        updateData.username =
        updateData.oldPassword =
          '';
      return;
    } catch (error) {
      seterrorMessage(error?.response.data.message);
      return;
    }
  };
  return (
    <>
      <Layout>
        <section className=''>
          <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
            <div className='w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 border-gray-700'>
              <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <h1 className='text-xl font-bold leading-tight tracking-tight text-black md:text-2xl text-center'>
                  Update Password
                </h1>
                <form
                  className='space-y-4 md:space-y-6'
                  onSubmit={handleSubmit}
                  autoComplete='off'
                >
                  <p className='text-red-500 text-[12px] text-center w-[90%] m-auto'>
                    {errorMessage}
                  </p>
                  <div>
                    <label
                      htmlFor='email'
                      className='block mb-2 text-sm font-medium text-gray-900 text-black'
                    >
                      Enter account username
                    </label>
                    <input
                      type='text'
                      name='username'
                      id='email'
                      className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='Enter username'
                      onChange={handleChange}
                      value={updateData?.username}
                      required={''}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='password'
                      className='block mb-2 text-sm font-medium text-gray-900 text-black'
                    >
                      Old Password
                    </label>
                    <input
                      type='password'
                      name='oldPassword'
                      id='password'
                      placeholder=''
                      className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      required={''}
                      onChange={handleChange}
                      value={updateData?.oldPassword}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='password'
                      className='block mb-2 text-sm font-medium text-gray-900 text-black'
                    >
                      New Password
                    </label>
                    <input
                      type='password'
                      name='newPassword'
                      id='password2'
                      placeholder=''
                      className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      required={''}
                      onChange={handleChange}
                      value={updateData?.newPassword}
                    />
                  </div>
                  <button
                    type='submit'
                    className='w-xl text-black bg-yellow-400  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 hover:cursor-pointer'
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Settings;
