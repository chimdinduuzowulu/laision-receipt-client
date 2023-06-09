import React, { useEffect, useState } from 'react';
import Layout from '../Layouts/Layout';
import '../styles/createReceipt.css';
import { printArea } from './PrintAreaFunction';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ReceiptTemplate = () => {
  const url = process.env.REACT_APP_SERVER_ENDPOINT_URL;
  const [receiptData, setreceiptData] = useState({});
  const [isGotten, setIsgotten] = useState(false);
  const { monthYear } = useParams();
  //
  useEffect(() => {
    const getReceipt = async () => {
      const receipt = await axios.get(`${url}receipt/${monthYear}`);
      const result = await receipt.data;
      setreceiptData(result.data);
      setIsgotten(true);
    };
    getReceipt();
  }, []);
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    printArea('printableArea');
  };
  //
  return (
    <>
      <Layout>
        <div className='ReceiptSpace row' id='printableArea'>
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
                  <td>{receiptData.station}</td>
                  <td>{receiptData.monthYear?.slice(5)}</td>
                  <td>{receiptData.monthYear?.slice(0, 4)}</td>
                  <td>{receiptData.rv}</td>
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
              {receiptData.payer}
            </p>
          </div>
          <div className='row justify-content-start'>
            <p className='col-2 p-2 justify-content-start'>Address:</p>
            <p
              className='col-9 p-2 '
              style={{ border: 'none', borderBottom: '1px dashed black' }}
            >
              {receiptData.address}
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
                  <td>{receiptData.head}</td>
                  <td rowSpan={2}>{receiptData.description}</td>
                  <td rowSpan={2}>#{receiptData.amount}</td>
                  <td rowSpan={2}>{} K</td>
                </tr>

                <tr>
                  <td>Subhead</td>
                  <td>{receiptData.subhead}</td>
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
              {receiptData.amountWords}
            </p>
          </div>
          {/*  PARTICULARS OF PAYMENT*/}
          <div className='row m-3 justify-content-between leading-[41px]'>
            <p className='col-4'>Particulars of payment:</p>
            <p
              className='col-8 p-2'
              style={{ border: 'none', borderBottom: '1px dashed black' }}
            >
              {receiptData.particulars}
            </p>
          </div>
          {/* Date and signature of payer */}
          <div className='row col-12 m-3 justify-content-between leading-[41px]'>
            <div className='col col-4 mt-12 align-items-center justify-content-start leading-[41px]'>
              <p
                className='col-12 p-2'
                style={{ border: 'none', borderBottom: '1px dashed black' }}
              >
                {receiptData.date}
              </p>
              <p className='col-12 mt-6 text-center'>Date</p>
            </div>
            <div className='col col-4 mt-12 justify-content-end'>
              <img src={receiptData.signature} alt='' />
              <p
                className='col-12 p-2'
                style={{ border: 'none', borderBottom: '1px dashed black' }}
              >
                {receiptData.signature}
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
            <button
              type='submit'
              className='btn btn-success col-4 ml-[122px] my-[32px]'
            >
              Print
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default ReceiptTemplate;
