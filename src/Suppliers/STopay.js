import React, {useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import Sidebar from '../Home/Sidebar'

const STopay = () => {
    const[customers, setCustomers] = useState([])
    const[menuBar, setMenuBar] = useState(false)
    const[search, setSearch] = useState()
    const newState = 3

    const getCustomers = async(e) => {
        try {
            const res = await fetch("/get-topay-suppliers", {
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

    const searchData = async(e) => {
        console.log(search)
        try {
            const res = await fetch("/search-topay-suppliers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({search})
            })
            const data = await res.json()
            if(res.status == 200){
                setCustomers(data)
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCustomers()
    }, [])

  return (
    <>
        <div className="topay_main">
        <div className={`menu_bar ${menuBar?'menu_bar_active':''}`}>
        <div className="top"><i className='fa fa-times' onClick={()=>setMenuBar(false)}></i></div>
            <div className="bottom">
                <NavLink className="navlink" to="/suppliers">Add Supplier</NavLink>
                <NavLink className="navlink" to="/suppliers-record">Records</NavLink>
                <NavLink className="navlink" to="/suppliers-filters">Filters</NavLink>
                <NavLink className="navlink" to="/suppliers-to-pay">To Pay</NavLink>
                <NavLink className="navlink" to="/suppliers-cheque-record">Cheque</NavLink>
            </div>
        </div>
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
                    <i className='fa fa-bars' onClick={()=>setMenuBar(true)}></i>
                    <NavLink className="navlink" to="/suppliers">Add Supplier</NavLink>
                    <NavLink className="navlink" to="/suppliers-record">Records</NavLink>
                    <NavLink className="navlink" to="/suppliers-filters">Filters</NavLink>
                    <NavLink className="navlink" to="/suppliers-to-pay">To Pay</NavLink>
                    <NavLink className="navlink" to="/suppliers-cheque-record">Cheque</NavLink>
                </div>
            </div>
            <div className="topay_bottom">
                <div className="heading">
                    <h1>Customers Record</h1>
                    <div className="search">
                        <input type="text" placeholder='Name, City, Country' 
                            onChange={(e)=>setSearch(e.target.value)}
                        />
                        <i className='fa fa-search' onClick={searchData}></i>
                    </div>
                </div>
                <div className="records">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>City</th>
                                <th>Country</th>
                                <th>Topay</th>
                                <th>Status</th>
                                <th>Full Record</th>
                            </tr>
                        </thead>
                        <tbody>
                        {customers?
                        customers.map((customer) => (
                            <>
                            {parseFloat(customer.amount)!==parseFloat(customer.paid)?
                            <>
                            <tr>
                                <td>{customer.name}</td>
                                <td>{customer.address1} {customer.address2}</td>
                                <td>{customer.email}</td>
                                <td>{customer.city}</td>
                                <td>{customer.country}</td>
                                <td>{parseFloat(customer.amount) - parseFloat(customer.paid)}$</td>
                                <td>{parseFloat(customer.amount)==parseFloat(customer.paid)?
                                    'Paid'
                                : 'Un-Paid'}</td>
                                <td><button id={customer._id} onClick={(e)=>{
                                    // setShow(true)
                                    // setSingleUser(e.target.id)
                                }}><i className='fa fa-eye'></i> View</button></td>
                            </tr>
                            </>:""
                            }
                            </>
                        ))
                        :"No Customer..."}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default STopay