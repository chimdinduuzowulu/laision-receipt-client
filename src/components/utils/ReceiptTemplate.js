import React, { useContext } from 'react';
import Layout from '../Layouts/Layout';
import  '../styles/createReceipt.css';
import { printArea } from './PrintAreaFunction';
import { ReceiptContext } from '../../contextApis/ReceiptContext';

const ReceiptTemplate = () => {
  // 
  const { receiptFormData } = useContext(ReceiptContext);
  // 
  const handleSubmit = (e) =>{
    e.preventDefault();
    printArea('printableArea'); 
  }
  // 
  return (
    <>
        <Layout>
            <div className='ReceiptSpace row col-12' id='printableArea'>
                <div className='row justify-content-center'>
                    <h6 className='col-9' style={{fontSize:"22px",fontWeight:"12px",lineHeight:"42px"}}>GOVERNMENT OF ANAMBRA STATE OF NIGERIA</h6>
                    <h6 className='col-9' style={{fontSize:"22px",lineHeight:"42px"}}>RECEIPT VOUCHER</h6>
                </div>
                <div className='row justify-content-start' >
                    <p className='col-4'>(To be submitted to Sub-Treasury in Duplicate only)</p>
                    <table className='col-7'>
                      <tbody>
                        <tr>
                          <th colSpan="4">FOR OFFICIAL USE ONLY</th>
                        </tr>
                        <tr>
                          <td>Treasury Station</td>
                          <td>Month</td>
                          <td>Year</td>
                          <td>Treasury R.V.NO.</td>
                        </tr>
                        <tr>
                          <td>{receiptFormData.station}</td>
                          <td>{receiptFormData.month?.slice(5)}</td>
                          <td>{receiptFormData.month?.slice(0,4)}</td>
                          <td>{receiptFormData.TRVNO}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className='row justify-content-start'>
                  <p className='col-3 p-2 justify-content-start'>Name of payer:</p>
                  <p className='col-9 p-2' style={{border:'none',borderBottom:'1px dashed black'}}>{receiptFormData.payer}</p>
                </div>
                <div className='row justify-content-start'>
                  <p className='col-2 p-2 justify-content-start'>Address:</p>
                  <p className='col-9 p-2 ' style={{border:'none',borderBottom:'1px dashed black'}}>{receiptFormData.address}</p>
                </div>
                 <div className='row justify-content-start' >
                    <table className='col-8 m-4'>
                      <tbody>
                        <tr>
                          <td rowSpan="2">Head</td>
                          <td>Code</td>
                          <td>Description</td>
                          <td colSpan="2">Amount paid(#)</td>
                        </tr>
                        <tr>
                          <td>{receiptFormData.station}</td>
                          <td>{receiptFormData.code_head}</td>
                          <td>{receiptFormData.description}</td>
                          <td>{receiptFormData.amount}</td>
                        </tr>
                        
                        <tr>
                          <td>Subhead</td>
                          <td>{receiptFormData.code_subhead}</td>
                          <td>{receiptFormData.station}</td>
                          <td>{receiptFormData.station}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                {/*  */}
                <div className='row justify-content-between' >
                  <p className='col-4'>Amount(in words):</p>
                  <p className='col-8 p-2' style={{border:'none',borderBottom:'1px dashed black'}}>{receiptFormData.amount_words}</p>
                </div>
                {/*  PARTICULARS OF PAYMENT*/}
                <div className='row m-3 justify-content-between'>
                  <p className='col-4'>Particulars of payment:</p>
                  <p className='col-8 p-2' style={{border:'none',borderBottom:'1px dashed black'}}>{receiptFormData.payment_particulars}</p>
                </div>
                {/* Date and signature of payer */}
                <div className='row col-12 m-3 justify-content-between'>
                  <div className='col col-4 mt-12 align-items-center justify-content-start'>
                      <p className='col-12 p-2' style={{border:'none',borderBottom:'1px dashed black'}}>{receiptFormData.date}</p>
                      <p className='col-12 mt-6 text-center'>Date</p>
                  </div>
                  <div className='col col-4 mt-12 justify-content-end'>
                    <img src={receiptFormData.signature} alt="" />
                    <p className='col-12 p-2' style={{border:'none',borderBottom:'1px dashed black'}}>{receiptFormData.signature}</p>
                      <p className='col-12 mt-6 text-center'>Signature of payer</p>
                  </div>
                  <h6 className='mt-4'>N.B. The person making payment is to be given an official receipt. </h6>
                </div>
            </div>
            <div className="col-md-1 m-[25px]">
              <form onSubmit={handleSubmit}>
                  <button type="submit" className="btn btn-primary col-12">Print</button>
                  </form>
            </div>
        </Layout>
        
    </>
  )
}

export default ReceiptTemplate;