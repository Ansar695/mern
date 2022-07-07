import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from '../../Home/Sidebar';
import { uuid } from 'uuidv4';
import "./display.css"

const Display = () => {
    const[paymentMethod, setPaymentMethod] = useState("")
    const[showOverlay, setShowOverlay] = useState(false)
    const[show, setShow] = useState(false)
    const[customers, setCustomers] = useState()
    const[invId, setInvId] = useState()
    const[search, setSearch] = useState()
    const[iId, setIId] = useState()
    const[menuBar, setMenuBar] = useState(false)
    const[info, setInfo] = useState({
        name: "",
        email: "",
        mobile: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "",
        postal: ""
    })
    const[invoices, setInvoices] = useState({
        invNo: null,
        amount: "",
        pay: "",
        cheque: "",
        company:"",
        issue: "",
        due: "",
        date: ""
    })
    const newState = 2

    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setInfo({
            ...info,
            [name]: value
        })
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setInvoices({
            ...invoices,
            [name]: value
        })
    }

    const deleteCustomer = async(e) => {
        const id = e.target.parentElement.id
        const email = e.target.parentElement.email
        const conf = window.confirm("Are you sure?")
        console.log(conf)
        if(conf){
            try {
                console.log(invoices)
                const res = await fetch("/delete-customer", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id,email
                    })
                })
                const data = await res.json()
                if(res.status == 200){
                    alert("Invoice Deeleted Successfully...")
                    console.log(data)
                    setShowOverlay(false)
                    window.location.reload()
                }else{
                    alert("Error occured, Please try again")
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const submitInvoice = async(e) => {
        if(invoices.invNo===null||invoices.amount===""||invoices.pay===""||invoices.date===""||invoices.paymentMethod==""){
            alert("Please Enter details")
        }else{
        if(invoices.amount < invoices.pay){
            alert("Please Enter Valid Pay Amount")
        }else{
            try {
                console.log(invoices)
                const res = await fetch("/add-customer-invoice", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        invNo:invoices.invNo,
                        amount:invoices.amount,
                        pay:invoices.pay,
                        paymentMethod:paymentMethod,
                        date:invoices.date, 
                        cheque:invoices.cheque,
                        company: invoices.company,
                        issue: invoices.issue,
                        due: invoices.due,
                        invId
                    })
                })
                const data = await res.json()
                if(res.status == 200){
                    alert("Invoice Added Successfully...")
                    console.log(data)
                    setShowOverlay(false)
                    window.location.reload()
                }else{
                    alert("Error occured, Please try again")
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    }

    const submitInfo = async(e) => {
        console.log(info)
        if(info.name==""||info.email==""||info.mobile==""||info.address1==""||info.city==""||info.country==""||info.postal==""){
            alert("Please fill out all fields...")
        }else{
            try {
                const res = await fetch("/add-customer", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name:info.name,
                        email:info.email,
                        mobile:info.mobile,
                        address1:info.address1,
                        address2:info.address2,
                        city:info.city,
                        state:info.state,
                        country:info.country,
                        postal:info.postal,
                    })
                })
                const data = await res.json()
                if(res.status == 200){
                    alert("Customer Added")
                    setShow(false)
                    getCustomers()
                    window.location.reload()
    
                    setInfo({
                        name: "",
                        email: "",
                        mobile: "",
                        address1: "",
                        address2: "",
                        city: "",
                        state: "",
                        country: "",
                        postal: ""
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const getCustomers = async(e) => {
        console.log(info)
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
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
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
          <div className="display_main">
          
            {/* ADD CUSTOMER OVERLAY */}
            <div className={`add_customer_overlay ${show? 'add_customer_overlay_active': ''}`}>
            <div className="icon" onClick={()=>setShow(false)}>
                <i className='fa fa-times'></i>
            </div>
            <div className="inner">
                <h2>PRIMARY CONTACT</h2>
                <div className="input">
                    <label>Name</label>
                    <input type="text" value={info.name} onChange={onChange} name="name"  />
                </div>
                <div className="input">
                    <label>Email</label>
                    <input type="email" value={info.email} onChange={onChange} name="email"  />
                </div>
                <div className="input">
                    <label>Mobile</label>
                    <input type="text" value={info.mobile} onChange={onChange} name="mobile"  />
                </div>

                    <h2>BILLING ADDRESS</h2>
                    <div className="input">
                        <label>Address Line 1: </label>
                        <input type="text" value={info.address1} onChange={onChange} name="address1"  />
                    </div>
                    <div className="input">
                        <label>Address Line 2: </label>
                        <input type="text" value={info.address2} onChange={onChange} name="address2" />
                    </div>
                    <div className="input">
                        <label>City: </label>
                        <input type="text" value={info.city} onChange={onChange} name="city"  />
                    </div>
                    <div className="input">
                        <label>State: </label>
                        <input type="text" value={info.state} onChange={onChange} name="state"  />
                    </div>
                    <div className="input">
                        <label>Country: </label>
                        <input type="text" value={info.country} onChange={onChange} name="country" />
                    </div>
                    <div className="input">
                        <label>Postal Code: </label>
                        <input type="text" value={info.postal} onChange={onChange} name="postal"  />
                    </div>
                    <div className="btns_add">
                        <button onClick={submitInfo}> <i className='fa fa-plus'></i> Add</button>
                        <button onClick={()=>setShow(false)}> <i className='fa fa-cross'></i> Close</button>
                    </div>
                </div>
            </div>

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
                    <div className="top">
                        <div className="search">
                            <h1>Customers List <i className='fa fa-plus'
                                onClick={(e) => setShow(true)}
                             ></i></h1>
                            <div className="inputs">
                                <input type="text" placeholder='Name, City, Country' 
                                    onChange={(e)=>setSearch(e.target.value)}
                                />
                                <i className='fa fa-search' onClick={searchData}></i>
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Email</th>
                                    <th>City</th>
                                    <th>Country</th>
                                    <th>Add Invoice</th>
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
                                    <td><button className='btn_add' id={customer._id} onClick={(e)=>{
                                        setShowOverlay(true)
                                        setInvId(e.target.id)
                                    }}>Invoice</button></td>
                                    <td className={customer.email} id={customer._id} onClick={deleteCustomer}><i
                                    style={{color:"red", fontSize:"20px", cursor:"pointer"}}
                                     className='fa fa-trash'></i></td>
                                </tr>
                            ))
                            :"No Customer..."}
                            </tbody>
                        </table>
                    </div>
                </div>
              </div>

              <div className={`overlay ${showOverlay? 'overlay_active': ''}`}>
                <div className="inner">
                    <div className="icon_cut">
                        <h3>Add Invoice Data</h3>
                        <i className='fa fa-times' onClick={()=>setShowOverlay(false)}></i>
                    </div>
                    <div className="input">
                        <label>Invoice No. : </label>
                        <input type="number" name="invNo" value={invoices.invNo} onChange={handleChange}/>
                    </div>
                    <div className="input">
                        <label>Amount : </label>
                        <input type="text" name="amount" value={invoices.amount} onChange={handleChange} />
                    </div>
                    <div className="input">
                        <label>Pay : </label>
                        <input type="text" name="pay" value={invoices.pay} onChange={handleChange} />
                    </div>
                    <div className="cheque_box">
                        <div className="input">
                            <label>Payment Method : </label>
                            <select name="method" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                <option value="">Payment Method</option>
                                <option value="Cash">Cash</option>
                                <option value="Online">Online</option>
                                <option value="Cheque">Cheque</option>
                            </select>
                        </div>
                        {paymentMethod=="Cheque"?
                            <>
                            <div className="input_inner">
                                <div className="input">
                                    <input type="text" name="cheque" placeholder='Cheque Number*' value={invoices.cheque} onChange={handleChange} />
                                </div>
                                <div className="input">
                                    <input type="text" name="company" placeholder='Company Name*' value={invoices.company} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="input_inner">
                                <div className="input">
                                    <input type="date" name="issue" placeholder='Issue date*' value={invoices.issue} onChange={handleChange} />
                                </div>
                                <div className="input">
                                    <input type="date" name="due" placeholder='Due Date*' value={invoices.due} onChange={handleChange} />
                                </div>
                            </div>
                            </>:
                            ""
                        }
                    </div>
                    <div className="input">
                        <label>Date : </label>
                        <input type="date" name="date" value={invoices.date} onChange={handleChange} />
                    </div>
                    <button onClick={submitInvoice}>Submit</button>
                </div>
              </div>
          </div>
      </>
  );
};

export default Display;
