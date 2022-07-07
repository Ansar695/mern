import React from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from '../../Home/Sidebar';
import "./Customer.css"

const Customer = () => {
    const newState=2
  return (
      <>
        <div className="customer_main">
            <div className="left">
            <Sidebar newState={newState} />
            </div>
            <div className="right">
                <div className="topbar">
                    <div className="topbar_left">
                        <div className="search">
                            <input type="text" placeholder='Search here' />
                            <i className='fa fa-search'></i>
                        </div>
                    </div>
                    <div className="topbar_right">
                        <NavLink className="navlink" to="/add-customers">Add Customer</NavLink>
                        <NavLink className="navlink" to="/records">Records</NavLink>
                        <NavLink className="navlink" to="/customers-filters">Filters</NavLink>
                        <NavLink className="navlink" to="/customers-to-pay">To Pay</NavLink>
                    <NavLink className="navlink" to="/customers-cheque-record">Cheque</NavLink>
                    </div>
                </div>
            </div>
        </div>
      </>
  );
};

export default Customer;
