import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

const InvoiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook to navigate between pages
  const [invoice, setInvoice] = useState({
    invoice_number: '',
    customer_name: '',
    date: '',
    details: [{ description: '', quantity: 1, unit_price: 0, line_total: 0 }],
    total_amount: 0
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:8000/api/invoices/${id}/`)
        .then(response => setInvoice(response.data))
        .catch(error => console.error('Error fetching invoice:', error));
    }
  }, [id]);

  // Handle changes for invoice fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  // Handle changes for line items
  const handleDetailChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDetails = [...invoice.details];

    // Update the value of the specific line item (description, quantity, unit_price)
    updatedDetails[index][name] = value;

    // Recalculate line total for this item
    updatedDetails[index].line_total = updatedDetails[index].quantity * updatedDetails[index].unit_price;

    // Update the state with the updated line item details
    setInvoice({
      ...invoice,
      details: updatedDetails
    });

    // Recalculate the overall total after updating the line item
    calculateTotal(updatedDetails);
  };

  // Add a new line item
  const addDetail = () => {
    const updatedDetails = [...invoice.details, { description: '', quantity: 1, unit_price: 0, line_total: 0 }];
    setInvoice({ ...invoice, details: updatedDetails });
  };

  // Remove a line item
  const removeDetail = (index) => {
    const updatedDetails = [...invoice.details];
    updatedDetails.splice(index, 1);
    setInvoice({ ...invoice, details: updatedDetails }, calculateTotal(updatedDetails));
  };

  // Calculate the total for all line items
  const calculateTotal = (details) => {
    let total = 0;
    details.forEach(detail => {
      total += detail.line_total; // Sum of all line totals
    });
    setInvoice(prevState => ({ ...prevState, total_amount: total }));
  };

  // Validation function to check if all fields are filled
  const validateForm = () => {
    if (!invoice.invoice_number || !invoice.customer_name || !invoice.date) {
      return 'Please fill in all required fields.';
    }

    // Check if there is at least one line item
    if (invoice.details.length === 0 || invoice.details.some(detail => !detail.description || !detail.quantity || !detail.unit_price)) {
      return 'Please add at least one line item with valid details.';
    }

    return ''; // Return empty string if no validation errors
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form before submitting
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return; // Prevent form submission if validation fails
    }

    setError(''); // Clear any previous error

    const url = id ? `http://127.0.0.1:8000/api/invoices/${id}/` : 'http://127.0.0.1:8000/api/invoices/';
    const method = id ? 'put' : 'post';

    axios[method](url, invoice)
      .then(() => {
        setSuccess('Invoice saved successfully!');
        navigate('/'); // Redirect to main page after saving
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.invoice_number) {
          setError(error.response.data.invoice_number); // Show the duplicate invoice number error
        } else {
          setError('Error saving invoice');
        }
        console.error('Error saving invoice:', error);
      });
  };

  // Cancel button handler to go back to the main page (invoice list)
  const handleCancel = () => {
    navigate('/'); // Redirect to the main page
  };

  return (
    <form onSubmit={handleSubmit} className="invoice-form">
      <h2 className='Form-heading'>{id ? 'Edit Invoice' : 'Create Invoice'}</h2>

      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message */}
      {success && <div style={{ color: 'green' }}>{success}</div>} {/* Success message */}
      <div className='form-top'>
      <input
        type="text"
        name="invoice_number"
        placeholder="Invoice Number"
        value={invoice.invoice_number}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="customer_name"
        placeholder="Customer Name"
        value={invoice.customer_name}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={invoice.date}
        onChange={handleChange}
        required
      />
      </div>
      {/* Line Items Section */}
      <div className='form-table'>
      <h3>Line Items</h3>
      <table >
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Line Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoice.details.map((detail, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={detail.description}
                  onChange={(e) => handleDetailChange(e, index)}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={detail.quantity}
                  onChange={(e) => handleDetailChange(e, index)}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  name="unit_price"
                  placeholder="Unit Price"
                  value={detail.unit_price}
                  onChange={(e) => handleDetailChange(e, index)}
                  required
                />
              </td>
              <td>{detail.line_total}</td>
              <td>
                <div class="remove-btn">
                <button type="button" onClick={() => removeDetail(index)}>Remove</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <button className='invoice-btn' type="button" onClick={addDetail}>Add Line</button>

      {/* Total Calculation */}
      <h3>Total: {invoice.total_amount}</h3>

      <button className='invoice-btn' type="submit">Save Invoice</button>

      {/* Cancel Button */}
      <button className='invoice-btn' type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>
        Cancel
      </button>
    </form>
  );
};

export default InvoiceForm;

