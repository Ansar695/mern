import React, {useState} from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Display from './Customers/Display/Display';
import Customer from './Customers/Home/Customer';
import Invoice from './Customers/Record/Invoice';
import Record from './Customers/Record/Record';
import Topay from './Customers/ToPay/Topay';
import Home from './Home/Home';
import SInvoice from './Suppliers/SInvoice';
import SRecord from './Suppliers/SRecord';
import STopay from './Suppliers/STopay';
import Supplier from './Suppliers/Supplier';
import Filter from "./Customers/Filters/Filter"
import SFilter from './Suppliers/SFilter';
import Signin from './Register/Signin';
import Cheque from './Customers/Cheques/Cheque';
import SCheque from './Suppliers/Cheques/SCheque';

const App = () => {
  const[invNo, setInvNo] = useState()
  const[sinvNo, setSInvNo] = useState()
  const[email, setEmail] = useState()
  const[semail, setSEmail] = useState()
  const handleInvoice = async(invNo, email) => {
    setInvNo(invNo)
    setEmail(email)
  }

  const handleSupInvoice = async(invNo, email) => {
    setSInvNo(invNo)
    setSEmail(email)
  }

  return (
      <>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Signin />} />
        <Route path='/customers' element={<Customer />} />
        <Route path='/customers-to-pay' element={<Topay />} />
        <Route path='/add-customers' element={<Display />} />
        <Route path='/display-records' element={<Home />} />
        <Route path='/records' element={<Record handleInvoice={handleInvoice} />} />
        <Route path='/customers-filters' element={<Filter />} />
        <Route path='/customers-cheque-record' element={<Cheque />} />
        <Route path='/suppliers-cheque-record' element={<SCheque />} />
        <Route path='/suppliers-filters' element={<SFilter />} />
        <Route path='/records-invoice' element={<Invoice invNo={invNo} email={email} />} />
        <Route path='/suppliers-records-invoice' element={<SInvoice sinvNo={sinvNo} semail={semail} />} />
        <Route path='/suppliers' element={<Supplier />} />
        <Route path='/suppliers-record' element={<SRecord handleSupInvoice={handleSupInvoice} />} />
        <Route path='/suppliers-to-pay' element={<STopay />} />
      </Routes>
      </>
  );
};

export default App;
