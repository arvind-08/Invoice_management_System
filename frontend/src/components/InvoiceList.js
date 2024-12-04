import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate, UNSAFE_ErrorResponseImpl, useNavigate } from 'react-router-dom';
import '../styles.css';
import Navbar from './Navbar';

const InvoiceList = () => {
   const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/invoices/?page=${page}&search=${searchQuery}`);
        setInvoices(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 5));
        setLoading(false);
      } catch (err) {
        setError('Error fetching invoices');
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [page, searchQuery]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      axios.delete(`http://127.0.0.1:8000/api/invoices/${id}/`)
        .then(() => {
          setInvoices(invoices.filter(invoice => invoice.id !== id));
        })
        .catch(error => {
          setError('Error deleting invoice');
        });
    }
  };
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="invoice-list">
       <Navbar />
        {/* <div className='header'>Invoices</div> */}
      {/* <h1></h1> */}
      <div className="top-bar">
      <button onClick={() => navigate('/create')} className="create-button">
        Create Invoice
      </button>
      <div className='search-bar'>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      </div>
      </div>
      {invoices.length === 0 ? (
        <p>No invoices found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(invoice => (
              <tr key={invoice.id}>
                <td>{invoice.invoice_number}</td>
                <td>{invoice.customer_name}</td>
                <td>{invoice.date}</td>
                <td>
                  {/* Edit button */}
                  <button onClick={() => handleEdit(invoice.id)} className="edit-button">Edit</button>
                  {/* Delete button */}
                  <button onClick={() => handleDelete(invoice.id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="pagination">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span> Page {page} of {totalPages} </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InvoiceList;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';  // Import the Navbar component
// import '../styles.css';

// const InvoiceList = () => {
//   const navigate = useNavigate();
//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const fetchInvoices = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/invoices/?page=${page}&search=${searchQuery}`);
//         setInvoices(response.data.results);
//         setTotalPages(Math.ceil(response.data.count / 5));
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching invoices');
//         setLoading(false);
//       }
//     };

//     fetchInvoices();
//   }, [page, searchQuery]);

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this invoice?')) {
//       axios.delete(`http://127.0.0.1:8000/api/invoices/${id}/`)
//         .then(() => {
//           setInvoices(invoices.filter(invoice => invoice.id !== id));
//         })
//         .catch(error => {
//           setError('Error deleting invoice');
//         });
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="invoice-list">
//       <Navbar />  {/* Add the Navbar here */}

//       {/* Main Content */}
//       <div className="top-bar">
//         <button onClick={() => navigate('/create')} className="create-button">
//           Create Invoice
//         </button>
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search by invoice number, customer name, or date"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//       </div>

//       {invoices.length === 0 ? (
//         <p>No invoices found</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Invoice Number</th>
//               <th>Customer Name</th>
//               <th>Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoices.map(invoice => (
//               <tr key={invoice.id}>
//                 <td>{invoice.invoice_number}</td>
//                 <td>{invoice.customer_name}</td>
//                 <td>{invoice.date}</td>
//                 <td>
//                   <button onClick={() => navigate(`/edit/${invoice.id}`)} className="edit-button">Edit</button>
//                   <button onClick={() => handleDelete(invoice.id)} className="delete-button">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <div className="pagination">
//         <button
//           onClick={() => setPage(page - 1)}
//           disabled={page === 1}
//         >
//           Previous
//         </button>
//         <span> Page {page} of {totalPages} </span>
//         <button
//           onClick={() => setPage(page + 1)}
//           disabled={page === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default InvoiceList;
