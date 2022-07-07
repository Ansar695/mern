import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "./sidebar.css"

const Sidebar = ({newState}) => {
    const[state, setState] = useState(newState)
    const[customer, setCustomers] = useState()

    const getUser = async(e) => {
        try {
            const res = await fetch("/get-user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json()
            if(res.status == 200){
                setCustomers(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

  return (
      <>
          <div className="sidebar">
            <div className="sidebar_inner">
                <div className="profile">
                    <div className="img">
                        <img src="./Images/avt.jpg" alt="" />
                    </div>
                    <div className="content">
                        <h3>{customer&&customer.user}</h3>
                        <small>Owner</small><br />
                    </div>
                </div>
                <div className="lower_menu">
                    <NavLink to="/home" className={`dashboard ${state==1?'dashboard_active':''}`} onClick={(e)=> {
                        setState(1)
                    }}>
                        <i className='fa fa-laptop'></i>
                        <h3>DASHBOARD</h3>
                    </NavLink>
                    <NavLink to="/add-customers" className={`dashboard ${state==2?'dashboard_active':''}`} onClick={(e)=> {
                        setState(2)
                    }}>
                        <i className='fa fa-user'></i>
                        <h3>CUSTOMERS</h3>
                    </NavLink>
                    <NavLink to="/suppliers" className={`dashboard ${state==3?'dashboard_active':''}`} onClick={(e)=> {
                        setState(3)
                    }}>
                        <i className='fa fa-users'></i>
                        <h3>SUPLLIERS</h3>
                    </NavLink>
                </div>
            </div>
          </div>
      </>
  )
};

export default Sidebar;
