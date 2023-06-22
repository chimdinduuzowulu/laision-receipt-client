import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/images/Logo.jpg';

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setloginData] = useState({});
  const [required, setrequired] = useState('');
  const [serverResponse, setserverResponse] = useState('');
  const [isloading, setIsloading] = useState(false);
  const url = process.env.REACT_APP_SERVER_ENDPOINT_URL;
  //
  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginData({ ...loginData, [name]: value });
  };
  //
  const handleSubmit = async (e) => {
    setIsloading(true);
    e.preventDefault();
    try {
      if (loginData.username !== ' ' && loginData.password !== ' ') {
        const res = await axios.post(`${url}login/checkLogin`, loginData);
        const result = await res.data;
        if (res.status === 200) {
          console.log(result.token);
          window.localStorage.setItem('token', result.token);
          navigate('/', { replace: true });
          return;
        }
      }
    } catch (error) {
      console.log(error?.response?.data);
      setserverResponse(error?.response?.data?.message);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <span className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white hover:text-yellow-100'>
          <img className='w-8 h-8 mr-2' src={Logo} alt='logo' />
          Anambra State
        </span>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
              {serverResponse && (
                <span className='text-red-500 text-center block'>
                  {serverResponse}
                </span>
              )}
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Enter username
                </label>
                <input
                  type='text'
                  name='username'
                  id='username'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='user name'
                  //   required={true}
                  onChange={handleChange}
                  value={loginData.username}
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  //   required={true}
                  onChange={handleChange}
                  value={loginData.password}
                />
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      id='remember'
                      aria-describedby='remember'
                      type='checkbox'
                      className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                      required=''
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label
                      htmlFor='remember'
                      className='text-gray-600 dark:text-gray-500'
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href='/login'
                  className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Forgot password?
                </a>
              </div>
              <button
                type='submit'
                className='w-full text-white bg-[#0b263d] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                {isloading ? 'Signing in ......' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
