import {React, useContext} from 'react'
import { Table } from 'react-bootstrap';
import PosContext from '../../../store/pos/pos-context';
import './InvoiceTemplate.css'

const InvoiceTemplate = (props) => {
    const { customerName, invoiceDate, lineItems } = props;
    
    return (
      <div className="invoice-container">
        <div className="header">
          <h1>Invoice</h1>
          <div className="customer-info">
            <p>Customer Name: {customerName}</p>
            <p>Invoice Date: {invoiceDate}</p>
          </div>
        </div>
        <table className="line-items">
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((item, index) => (
              <tr key={index}>
                <td>{item.item}</td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="footer">
          <p>Thank you for your business!</p>
        </div>
      </div>
    );
}
  

export default InvoiceTemplate