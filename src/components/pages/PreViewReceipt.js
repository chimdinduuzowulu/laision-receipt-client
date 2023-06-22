import React, { useContext, useState } from 'react';
import { ReceiptContext } from '../../contextApis/ReceiptContext';
import axios from 'axios';
import Layout from '../Layouts/Layout';
import { toast } from 'react-toastify';

const PreViewReceipt = () => {
  //
  const [serverResponse, setserverResponse] = useState({});
  const [responseIsSet, setresponseIsSet] = useState(false);
  const [isUploading, setisUploading] = useState(false);
  const url = process.env.REACT_APP_SERVER_ENDPOINT_URL;
  const { receiptFormData, setReceiptFormData } = useContext(ReceiptContext);
  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    setisUploading(true);
    const rData = await axios.post(`${url}receipt/`, receiptFormData);
    const result = await rData.data;
    setserverResponse(result);
    result.message === 'Receipt created successfuly'
      ? toast.success('Receipt uploaded successfully')
      : toast.error(result.message);
    setresponseIsSet(true);
    setisUploading(false);
    setserverResponse({});
    setReceiptFormData({});
  };

  //
  return (
    <>
      <Layout>
        <div className='ReceiptSpace row col-12' id='printableArea'>
          <div className='row justify-content-center'>
            <h6
              className='col-9'
              style={{
                fontSize: '22px',
                fontWeight: '12px',
                lineHeight: '42px',
              }}
            >
              GOVERNMENT OF ANAMBRA STATE OF NIGERIA
            </h6>
            <h6
              className='col-9'
              style={{ fontSize: '22px', lineHeight: '42px' }}
            >
              RECEIPT VOUCHER
            </h6>
          </div>
          <div className='row justify-content-start leading-[41px]'>
            <p className='col-4'>
              (To be submitted to Sub-Treasury in Duplicate only)
            </p>
            <table className='col-7 leading-[41px]'>
              <tbody>
                <tr>
                  <th colSpan='4'>FOR OFFICIAL USE ONLY</th>
                </tr>
                <tr>
                  <td>Treasury Station</td>
                  <td>Month</td>
                  <td>Year</td>
                  <td>Treasury R.V.NO.</td>
                </tr>
                <tr>
                  <td>{receiptFormData.station}</td>
                  <td>{receiptFormData.monthYear?.slice(5)}</td>
                  <td>{receiptFormData.monthYear?.slice(0, 4)}</td>
                  <td>{receiptFormData.rv}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='row justify-content-start leading-[41px]'>
            <p className='col-3 p-2 justify-content-start'>Name of payer:</p>
            <p
              className='col-9 p-2'
              style={{ border: 'none', borderBottom: '1px dashed black' }}
            >
              {receiptFormData.payer}
            </p>
          </div>
          <div className='row justify-content-start'>
            <p className='col-2 p-2 justify-content-start'>Address:</p>
            <p
              className='col-9 p-2 '
              style={{ border: 'none', borderBottom: '1px dashed black' }}
            >
              {receiptFormData.address}
            </p>
          </div>
          <div className='row justify-content-start leading-[41px]'>
            <table className='col-12 m-4 jsutify-content-center leading-[41px]'>
              <tbody>
                <tr>
                  <td rowSpan='2'>Head</td>
                  <td>Code No</td>
                  <td>Description</td>
                  <td colSpan='2'>Amount paid(#)</td>
                </tr>
                <tr>
                  <td>{receiptFormData.head}</td>
                  <td rowSpan={2}>{receiptFormData.description}</td>
                  <td rowSpan={2}>#{receiptFormData.amount}</td>
                  <td rowSpan={2}>{} K</td>
                </tr>

                <tr>
                  <td>Subhead</td>
                  <td>{receiptFormData.subhead}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/*  */}
          <div className='row justify-content-between'>
            <p className='col-4'>Amount(in words):</p>
            <p
              className='col-8 p-2'
              style={{ border: 'none', borderBottom: '1px dashed black' }}
            >
              {receiptFormData.amountWords}
            </p>
          </div>
          {/*  PARTICULARS OF PAYMENT*/}
          <div className='row m-3 justify-content-between leading-[41px]'>
            <p className='col-4'>Particulars of payment:</p>
            <p
              className='col-8 p-2'
              style={{ border: 'none', borderBottom: '1px dashed black' }}
            >
              {receiptFormData.particulars}
            </p>
          </div>
          {/* Date and signature of payer */}
          <div className='row col-12 m-3 justify-content-between leading-[41px]'>
            <div className='col col-4 mt-12 align-items-center justify-content-start leading-[41px]'>
              <p
                className='col-12 p-2'
                style={{ border: 'none', borderBottom: '1px dashed black' }}
              >
                {receiptFormData.date}
              </p>
              <p className='col-12 mt-6 text-center'>Date</p>
            </div>
            <div className='col col-4 mt-12 justify-content-end'>
              <img src={receiptFormData.signature} alt='' />
              <p
                className='col-12 p-2'
                style={{ border: 'none', borderBottom: '1px dashed black' }}
              >
                {receiptFormData.signature}
              </p>
              <p className='col-12 mt-6 text-center'>Signature of payer</p>
            </div>
            <h6 className='mt-4 leading-[41px]'>
              N.B. The person making payment is to be given an official receipt.{' '}
            </h6>
          </div>
        </div>
        <div className='row col-md-6 m-[25px]'>
          <form onSubmit={handleSubmit}>
            <a
              type='button'
              href='/create'
              className='btn btn-danger col-4 m-[18px]'
            >
              Cancel
            </a>
            <button type='submit' className='btn btn-success col-4'>
              {isUploading ? 'Uploading....' : 'Upload'}
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default PreViewReceipt;
