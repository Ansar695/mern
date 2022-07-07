import React, { useEffect,useState } from 'react'
import { NavLink } from 'react-router-dom'
import Sidebar from '../Home/Sidebar'

const SInvoice = ({sinvNo, semail}) => {
const[customers, setCustomers] = useState()
const[invs, setInvs] = useState()
const[show, setShow] = useState(false)
const[payment, setPayment] = useState()
const[updates, setUpdates] = useState({
    cheque: "",
    company:'',
    issue: '',
    due: '',
    date: "",
    pay: ""
})
const newState = 3

const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUpdates({
        ...updates,
        [name]: value
    })
}

const submitUpdate = async(e) => {
    let amountRem=0;
    customers&&customers.invoices&&customers.invoices.map((invoice) => {
        if(invoice.invNo === sinvNo){
            amountRem = parseFloat(invoice.amount) - parseFloat(invoice.pay)
        }
    })
    if(amountRem < updates.pay){
        alert("Please Enter valid Amount To Pay")
    }else{
    try {
        console.log(semail,sinvNo)
        const res = await fetch("/add-suppliers-invoices", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sinvNo, semail,
                cheque: updates.cheque,
                company: updates.company,
                issue: updates.issue,
                due: updates.due,
                date: updates.date,
                pay: updates.pay,
                payment
            })
        })
        const data = await res.json()
        console.log(data)
        if(res.status == 200){
            alert("Invoice added successfully...")
            getInvoice()
        }
    } catch (error) {
        console.log(error)
    }
}
}

const getInvoice = async(e) => {
    try {
        const res = await fetch("/get-suppliers-invoice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({sinvNo, semail})
        })
        const data = await res.json()
        console.log(data)
        if(res.status == 200){
            setInvs(data)
        }
    } catch (error) {
        console.log(error)
    }
}

const getCustomer = async(e) => {
    console.log(sinvNo,semail)
    try {
        const res = await fetch("/get-supplier-data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({sinvNo, semail})
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

const selectMethod = (e) => {
    setPayment(e.target.value)
    if(e.target.value === "Cheque"){
        setShow(true)
    }else{
        setShow(false)
    }
}

useEffect(() => {
    getCustomer()
    getInvoice()
},[])
  return (
    <>
        <div className="invoice_main">
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
                        <NavLink className="navlink" to="/suppliers">Add Supplier</NavLink>
                        <NavLink className="navlink" to="/suppliers-record">Records</NavLink>
                        <NavLink className="navlink" to="/suppliers-filters">Filters</NavLink>
                        <NavLink className="navlink" to="/suppliers-to-pay">To Pay</NavLink>
                    </div>
                </div>
            {customers?
                <>
                <div className="inner">
                    <h2>Customer Profile</h2>
                    <div className="card">
                        <div className="left">
                            <div className="image">
                                <img src="./Images/avt.jpg" alt="" />
                            </div>
                            <p>{customers.name}</p>
                            <small>{customers.email}</small><br />
                            <button>Email Now</button>
                        </div>
                        <div className="right">
                            <h2>Pay Now</h2>
                            <div className="input">
                                <label>Payment Method: </label>
                                <select onClick={selectMethod}>
                                    <option value="">Payment Method</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Online">Online</option>
                                    <option value="Cheque">Cheque</option>
                                </select>
                            </div>

                            <div id='cheque_input' className={`${show?'input':'show'}`}>
                                <div className="d1">
                                    <label>Cheque No.</label>
                                    <input type="text" name="cheque" value={updates.cheque} onChange={handleChange} placeholder='Cheque Number*'  />
                                    <label>Company</label>
                                    <input type="text" name="company" value={updates.company} onChange={handleChange} placeholder='Company Name*'  />
                                </div>
                                <div className="d2">
                                    <label>Issue Date:</label>
                                    <input type="date" name="issue" value={updates.issue} onChange={handleChange} />
                                    <label>Due Date:</label>
                                    <input type="date" name="due" value={updates.due} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="input">
                                <label>Date: </label>
                                <input type="date" name="date" value={updates.date} onChange={handleChange} />
                            </div>
                            <div className="input">
                                <label>Pay: </label>
                                <input type="text" name="pay" value={updates.pay} onChange={handleChange}/>
                            </div>
                            <button className="btn" onClick={submitUpdate}>Pay Now</button>
                        </div>
                    </div>
                </div>

                {/* TABLE */}
                <div className="user_table">
                    <h2>Invoice Record</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Amount</th>
                                <th>Paid</th>
                                <th>To Pay</th>
                                <th>Date</th>
                                <th>Payment Method</th>
                            </tr>
                        </thead>
                        <tbody>
                        {invs?invs.map((invoice) => (
                            <tr>
                                <td>{invoice.amount}$</td>
                                <td>{invoice.pay}$</td>
                                <td>{parseFloat(invoice.amount)-parseFloat(invoice.pay)}$</td>
                                <td>{invoice.date}</td>
                                <td>{invoice.paymentMethod}</td>
                            </tr>
                        )): "No Invoices"}
                        </tbody>
                    </table>
                </div>
                </>: "No Record..."}
            </div>
        </div>
    </>
  )
}

export default SInvoice