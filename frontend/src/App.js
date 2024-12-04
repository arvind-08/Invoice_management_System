import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceList from './components/InvoiceList';
import InvoiceForm from './components/InvoiceForm';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<InvoiceList />} />
          <Route path="/create" element={<InvoiceForm />} />
          <Route path="/edit/:id" element={<InvoiceForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
