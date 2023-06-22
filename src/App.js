import React, { useEffect, useLayoutEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import CreateReceipt from './components/pages/CreateReceipt';
import ReceiptTemplate from './components/utils/ReceiptTemplate';
import { ReceiptContext } from './contextApis/ReceiptContext';
import Login from './components/Login';
import PreViewReceipt from './components/pages/PreViewReceipt';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FilterReceiptYear from './components/pages/FilterReceiptYear';
import ProtectedRoute from './components/ProtectedRoute';
import Logout from './components/utils/Logout';
import Settings from './components/pages/Settings';

function App() {
  const [receiptFormData, setReceiptFormData] = useState({});
  // const [, setAuth] = useState(false);

  const isAuthenticated = window.localStorage.getItem('token');
  return (
    <>
      <div className='sb-nav-fixed'>
        <ReceiptContext.Provider
          value={{ receiptFormData, setReceiptFormData }}
        >
          <Routes>
            <Route
              path='/'
              exact
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path='/index'
              exact
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path='/settings'
              exact
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path='/filter'
              exact
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <FilterReceiptYear />
                </ProtectedRoute>
              }
            />
            <Route
              path='/create'
              exact
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CreateReceipt />
                </ProtectedRoute>
              }
            />
            <Route
              path='/receipt/:monthYear'
              exact
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ReceiptTemplate />
                </ProtectedRoute>
              }
            />
            <Route path='/login' exact element={<Login />} />
            <Route path='/logout' exact element={<Logout />} />
            <Route
              path='/preview'
              exact
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <PreViewReceipt />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ReceiptContext.Provider>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
