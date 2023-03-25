import React, { useState } from 'react';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import CreateReceipt from './components/pages/CreateReceipt';
import ReceiptTemplate from './components/utils/ReceiptTemplate';
import { ReceiptContext } from './contextApis/ReceiptContext';
import Login from './components/Login';
import PreViewReceipt from './components/PreViewReceipt';

function App() {
  const [ receiptFormData, setReceiptFormData ] = useState({})
  return (
    <div className="sb-nav-fixed">
      <ReceiptContext.Provider value={{receiptFormData, setReceiptFormData}}>
      <Routes>
        <Route path='/' exact element={ <Dashboard/>}/>
        <Route path='/index' exact element={<Dashboard/>}/>
        <Route path='/create' exact element={<CreateReceipt/>}/>
        <Route path='/receipt' exact element={<ReceiptTemplate/>}/>
        <Route path='/login' exact element={<Login/>}/>
        <Route path='/preview' exact element={<PreViewReceipt/>}/>
      </Routes>
      </ReceiptContext.Provider>
    </div>
  );
}

export default App;
