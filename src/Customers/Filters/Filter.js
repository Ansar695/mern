import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import Sidebar from '../../Home/Sidebar'
import "./filter.css"

const Filter = () => {
    const[customers, setCustomers] = useState()
    const[from, setFrom] = useState()
    const[to, setTo] = useState()
    const[menuBar, setMenuBar] = useState(false)

    const[totalAmount, setTotalAmount] = useState()
    const[totalTopay, setTotalTopay] = useState()

    const newState = 2;

    const getInvoice = async(e) => {
        let t=0
        let p=0;
        try {
            const res = await fetch("/get-customer-invoices", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json()
            console.log(data)
            if(res.status == 200){
                setCustomers(data)
                data.map((d) => {
                    if(d){
                        t = parseFloat(t)+ parseFloat(d.amount);
                        p = parseFloat(p)+ parseFloat(d.paid)
                    }
                })
                setTotalAmount(t)
                setTotalTopay(t-p)
                console.log(t,p)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const searchInvoice = async(e) => {
        console.log("TEST",from, to)
        let t=0
        let p=0;
        try {
            const res = await fetch("/search-customer-invoices", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({from, to})
            })
            const data = await res.json()
            console.log(data)
            if(res.status == 200){
                setCustomers(data)
                data.map((d) => {
                    if(d){
                        t = parseFloat(t)+ parseFloat(d.amount);
                        p = parseFloat(p)+ parseFloat(d.paid)
                    }
                })
                setTotalAmount(t)
                setTotalTopay(t-p)
                console.log(t,p)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getInvoice()
    }, [])

  return (
    <>
        <div className="filter_main">
        <div className={`menu_bar ${menuBar?'menu_bar_active':''}`}>
            <div className="top"><i className='fa fa-times' onClick={()=>setMenuBar(false)}></i></div>
            <div className="bottom">
                <NavLink className="navlink" to="/add-customers">Add Customer</NavLink>
                <NavLink className="navlink" to="/records">Records</NavLink>
                <NavLink className="navlink" to="/customers-filters">Filters</NavLink>
                <NavLink className="navlink" to="/customers-to-pay">To Pay</NavLink>
                <NavLink className="navlink" to="/customers-cheque-record">Cheque</NavLink>
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
                        <NavLink className="navlink" to="/add-customers">Add Customer</NavLink>
                        <NavLink className="navlink" to="/records">Records</NavLink>
                        <NavLink className="navlink" to="/customers-filters">Filters</NavLink>
                        <NavLink className="navlink" to="/customers-to-pay">To Pay</NavLink>
                        <NavLink className="navlink" to="/customers-cheque-record">Cheque</NavLink>
                    </div>
                </div>

                <div className="bottom">
                    <div className="search_invoice">
                        <div className="head">
                            <h2>Customer Invoices</h2>
                            <p>Amount : {totalAmount}</p>
                            <p>To Pay : {totalTopay}</p>
                        </div>
                        <div className="search">
                            <div className="from">
                                <p>From:</p>
                                <input type="Date" onChange={(e)=>setFrom(e.target.value)} placeholder="From " />
                            </div>
                            <div className="from">
                                <p>To:</p>
                                <input type="Date" onChange={(e)=>setTo(e.target.value)} placeholder="To " />
                            </div>
                            <button onClick={searchInvoice}>Search <i className="fa fa-search"></i></button>
                        </div>
                    </div>
                <div className="records">
                    <table>
                        <thead>
                            <tr>
                                <th>Invoice</th>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Paid</th>
                                <th>To Pay</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {customers?
                        customers.map((customer) => (
                            <>
                            {customer.invoices.map((inv) => (
                                <tr>
                                <td>{inv.invNo}</td>
                                <td>{customer.name}</td>
                                <td>{inv.amount}</td>
                                <td>{inv.pay}</td>
                                <td>{parseFloat(inv.amount)-parseFloat(inv.pay)}</td>
                                <td>{inv.date}</td>
                                </tr>
                            ))}
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

export default Filter