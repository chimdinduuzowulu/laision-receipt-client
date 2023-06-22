import React, { useContext, useState } from 'react';
import Layout from '../Layouts/Layout';
import '../styles/createReceipt.css';
import { ReceiptContext } from '../../contextApis/ReceiptContext';
import { useNavigate } from 'react-router-dom';

const CreateReceipt = () => {
  const { setReceiptFormData } = useContext(ReceiptContext);
  const [inputError, setinputError] = useState('');
  const navigate = useNavigate();
  //
  const [receiptData, setData] = useState({});
  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...receiptData,
      [name]: value,
    });
  };
  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setReceiptFormData(receiptData);
    if (Object.keys(receiptData).length < 13) {
      setinputError('All fields are required!!');
      return;
    }
    navigate('/preview');
  };
  //
  return (
    <>
      <Layout>
        <div className='container space'>
          <form className='row g-3' onSubmit={handleSubmit}>
            <div className='col-md-6'>
              <label htmlFor='inputState' className='form-label'>
                Treasury station
              </label>
              <select
                id='inputState'
                className='form-select'
                name='station'
                onChange={handleChange}
                value={receiptData.station}
              >
                <option>Choose...</option>
                <option>Abuja</option>
                <option>Anambra</option>
                <option>Lagos</option>
              </select>
              <span className='text-red-500 text-[14px]'>{inputError}</span>
            </div>
            <div className='col-md-6'>
              <label htmlFor='inputCity' className='form-label'>
                Month-Yeaar
              </label>
              <input
                type='month'
                className='form-control'
                id='inputDate'
                name='monthYear'
                value={receiptData.monthYear}
                onChange={handleChange}
              />
              <span className='text-red-500 text-[14px]'>{inputError}</span>
            </div>
            <div className='col-md-6'>
              <label htmlFor='inputEmail4' className='form-label'>
                Treasury R.V No
              </label>
              <input
                type='text'
                className='form-control'
                id='inputEmail4'
                name='rv'
                value={receiptData.rv}
                onChange={handleChange}
              />
              <span className='text-red-500 text-[14px]'>{inputError}</span>
            </div>
            <div className='col-md-6'>
              <label htmlFor='inputPassword4' className='form-label'>
                Name of payer
              </label>
              <input
                type='text'
                className='form-control'
                id='inputCity'
                name='payer'
                value={receiptData.payer}
                onChange={handleChange}
              />
              <span className='text-red-500 text-[14px]'>{inputError}</span>
            </div>
            <div className='col-md-12'>
              <label htmlFor='inputEmail4' className='form-label'>
                Address
              </label>
              <input
                type='text'
                className='form-control'
                id='inputEmail4'
                name='address'
                value={receiptData.address}
                onChange={handleChange}
              />
              <span className='text-red-500 text-[14px]'>{inputError}</span>
            </div>
            <div className='col-md-6'>
              <label htmlFor='inputPassword4' className='form-label'>
                Code No: Head
              </label>
              <input
                type='text'
                className='form-control'
                id='inputPassword4'
                placeholder='head'
                name='head'
                value={receiptData.head}
                onChange={handleChange}
              />
              <span className='text-red-500 text-[14px]'>{inputError}</span>
            </div>
            <div className='col-6'>
              <label htmlFor='inputAddress' className='form-label'>
                Code No: Subhead
              </label>
              <input
                type='text'
                className='form-control'
                id='inputAddress'
                placeholder='subhead'
                name='subhead'
                value={receiptData.subhead}
                onChange={handleChange}
              />
              <span className='text-red-500 text-[14px]'>{inputError}</span>
            </div>
            <div className='col-12'>
              <label htmlFor='inputAddress2' className='form-label'>
                Description
              </label>
              <input
                type='text'
                className='form-control'
                id='inputAddress2'
                placeholder='Description'
                name='description'
                value={receiptData.description}
                onChange={handleChange}
              />
              <span className='text-red-500 text-[14px]'>{inputError}</span>
            </div>
            <div className='col-md-6'>
              <label htmlFor='inputPassword4' className='form-label'>
                Amount(#)
              </label>
              <input
                type='number'
                className='form-control'
                id='inputPassword4'
                name='amount'
                value={receiptData.amount}
                onChange={handleChange}
              />
              <span className='text-red-500 text-[14px]'>{inputError}</span>
            </div>
            <div className='col-6'>
              <label htmlFor='inputAddress' className='form-label'>
                Amount in words
              </label>
              <input
                type='text'
                className='form-control'
                id='inputAddress'
                placeholder='Amount in words'
                name='amountWords'
                value={receiptData.amountWords}
                onChange={handleChange}
              />
              <span className='text-red-500 text-[14px]'>{inputError}</span>
            </div>
            <div className='input-group col-12'>
              <span className='input-group-text'>Particulars of payment</span>
              <textarea
                className='form-control'
                onChange={handleChange}
                aria-label='With textarea'
                name='particulars'
                id={'payment_particulars'}
              ></textarea>
              <span className='text-red-500 text-[14px]'>{inputError}</span>
            </div>
            <div className='col-md-6'>
              <label htmlFor='inputCity' className='form-label'>
                Date
              </label>
              <input
                type='date'
                className='form-control'
                id='inputCity'
                name='date'
                value={receiptData.date}
                onChange={handleChange}
              />
              <span className='text-red-500 text-[14px]'>{inputError}</span>
            </div>
            <div className='col-md-6'>
              <label htmlFor='inputState' className='form-label'>
                Signature
              </label>
              <div className='input-group mb-3'>
                <input
                  type='file'
                  className='form-control'
                  id='inputGroupFile02'
                  name='signature'
                  value={receiptData.signature}
                  onChange={handleChange}
                />
                <span className='text-red-500 text-[14px]'>{inputError}</span>
              </div>
            </div>
            <div className='col-12'>
              <button type='submit' className='btn btn-primary'>
                Preview
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default CreateReceipt;
