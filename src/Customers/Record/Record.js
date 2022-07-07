import React, {useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from '../../Home/Sidebar';
import "./record.css"

const Record = ({handleInvoice}) => {
    const[show, setShow] = useState(false)
    const[customers, setCustomers] = useState()
    const[totalAmount, setTotalAmount] = useState()
    const[paid, setPaid] = useState(0.0)
    const[signleUser, setSingleUser] = useState()
    const[search, setSearch] = useState()
    const[from, setFrom] = useState()
    const[to, setTo] = useState()
    const[emailBox, setEmailBox] = useState(false)
    const[subject, setSubject] = useState()
    const[message, setMessage] = useState()
    const[cusEmail, setCusEmail] = useState()
    const[menuBar, setMenuBar] = useState(false)
    const newState = 2
    let topay = 0.0;

    const sendEmail = async(e) => {
        setEmailBox(true)
        const to = e.target.id
        setTo(to)
    }

    const sendEmailNow = async(e) => {
        try {
            if(to == "" || message == "" || subject == ""){
              alert("Please Enter details...")
            }else{
              const res = await fetch("/send_email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({to, subject, message})
            })
            const data = await res.json()
            if(res.status == 200){
              alert("Email sent successfully.")
    
              setSubject("")
              setMessage("")
              setEmailBox(false)
            }
            }
        } catch (error) {
            console.log(error)
            alert("Email not please check your connection... ")
        }
    }

    const filterInvoices = async(e) => {
        try {
            const res = await fetch("/search-customer-invoices-main", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({from, to, signleUser})
            })
            const data = await res.json()
            console.log(data)
            if(res.status == 200){
                setCustomers(data)
            }
        } catch (error) {
            console.log(error)
        }
    } 

    const getCustomers = async(e) => {
        try {
            const res = await fetch("/get-customers", {
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

    const payAllAmount = async(e) => {
        const pId = e.target.className
        const cId = e.target.id
        const topay = e.target.parentElement.parentElement.children[3].textContent
        console.log(topay)
        if(topay !== "0$"){
            try {
                const res = await fetch("/update-customer-invoice", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({pId, cId})
                })
                alert("Invoice added successfully...")
                getCustomers()
                const data = await res.json()
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const deleteInvoice = async(e) => {
        const invNo = e.target.id
        const email = e.target.parentElement.id
        try {
            const res = await fetch("/delete-customer-invoice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({invNo, email})
            })
            const data = await res.json()
            console.log(data)
            if(res.status == 200){
                alert("Invoice Deleted successfully...")
                getCustomers()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const navigateInvoice = async(e) => {
        const invNo = e.target.parentElement.id
        const email = e.target.id
        setCusEmail(email)
        console.log(invNo, email)
        handleInvoice(invNo, email)
    }

    const searchData = async(e) => {
        console.log(search)
        try {
            const res = await fetch("/search-customers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({search})
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
       getCustomers()
    },[])

  return (
      <>
          <div className="record_main">
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

                    <div className="bottoms">
                        <div className={`record_bottom ${show?'record_bottom_active':''}`}>
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
                                                setShow(true)
                                                setSingleUser(e.target.id)
                                            }}>View</button></td>
                                        </tr>
                                    ))
                                    :"No Customer..."}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className={`user_record_overlay ${show?'user_record_overlay_active':''}`}>
                            {customers&&customers.map((customer) => (
                            <>
                            {customer._id==signleUser&&
                            <>
                            <div className="inner">
                            {/* Email Box */}
                            <div className={`email_box ${emailBox?'email_box_active':''}`}>
                                    <div className="top">
                                        <p>Send Email</p>
                                        <i className="fa fa-times" onClick={
                                            (e)=>setEmailBox(false)
                                        }></i>
                                    </div>
                                    <div className="bottom">
                                        <input type="email" placeholder="To" value={to}/>
                                        <input type="text" onChange={(e)=>setSubject(e.target.value)} placeholder="Subject" value={subject}/>
                                        <textarea onChange={(e)=>setMessage(e.target.value)} placeholder="Enter a message here..."></textarea>
                                        <button onClick={sendEmailNow}>Send Email</button>
                                    </div>
                                </div>
                                <h2>Customer Profile</h2>
                                <div className="user_card">
                                    <div className="left">
                                        <div className="image">
                                            <img src="./Images/avt.jpg" alt="" />
                                        </div>
                                        <p>{customer.name}</p>
                                        <small>{customer.email}</small><br />
                                        <button id={customer.email} onClick={sendEmail}>Email Now</button>
                                    </div>
                                    <div className="right">
                                        <p><strong>Address:</strong> {customer.address1} {customer.address2}</p>
                                        <p><strong>Phone:</strong> {customer.mobile}</p>
                                        <p><strong>City:</strong> {customer.city}</p>
                                        <p><strong>Country:</strong> {customer.country}</p>
                                        <p><strong>Postal Code:</strong> {customer.postal}</p>
                                        <div className="payments">
                                            <div className="total user_info">
                                                <small>Total</small>
                                                <h4>{customer.amount} $</h4>
                                            </div>
                                            <div className="to_pay user_info">
                                                <small>To Pay</small>
                                                <h4>{parseFloat(customer.amount) - parseFloat(customer.paid)} $</h4>
                                            </div>
                                            <div cla ssName="status user_info">
                                                <small>Status</small>
                                                <h4>{parseFloat(customer.amount)==parseFloat(customer.paid)?'Paid': 'Un-Paid'}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* TABLE */}
                            <div className="user_table">
                            <div className="search_invoice">
                                <h2>Customer Invoices</h2>
                                <div className="search">
                                    <div className="from">
                                        <p>From:</p>
                                        <input type="Date" onChange={(e)=>setFrom(e.target.value)} placeholder="From " />
                                    </div>
                                    <div className="from">
                                        <p>To:</p>
                                        <input type="Date" onChange={(e)=>setTo(e.target.value)} placeholder="To " />
                                    </div>
                                    <button onClick={filterInvoices}>Search <i className="fa fa-search"></i></button>
                                </div>
                            </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Invoice No</th>
                                            <th>Amount</th>
                                            <th>Paid</th>
                                            <th>To Pay</th>
                                            <th>Date</th>
                                            <th>Payment</th>
                                            <th className="last">Update</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {customer.invoices&&
                                    customer.invoices.map((inv) => (
                                        <tr>
                                            <td>{inv.invNo}</td>
                                            <td>{inv.amount}$</td>
                                            <td>{inv.pay}$</td>
                                            <td>{parseFloat(inv.amount)-parseFloat(inv.pay)}$</td>
                                            <td>{inv.date}</td>
                                            <td>{inv.paymentMethod}</td>
                                            <td className="last" id={customer.email}>
                                                <button className={customer._id} id={inv._id} onClick={payAllAmount}>Pay</button>
                                                <i className="fa fa-trash" id={inv.invNo} onClick={deleteInvoice}></i>
                                                <NavLink to="/records-invoice" id={inv.invNo}><i className="fa fa-arrow-right" id={customer.email} onClick={navigateInvoice}></i></NavLink>
                                            </td>
                                        </tr>
                                    ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                            </>
                            }
                            </>
                            ))
                            }
                        </div>
                    </div>
              </div>
          </div>
      </>
  );
};

export default Record;
