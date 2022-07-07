import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Sidebar from '../../Home/Sidebar'
import "./scheque.css"

const SCheque = () => {
    const[data, setData] = useState()
    const[search, setSearch] = useState()
    const[menuBar, setMenuBar] = useState(false)
  const newState=3

  const searchData = async(e) => {
    console.log(search)
    try {
        const res = await fetch("/search-suppliers-cheques", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
                body: JSON.stringify({search})
            })
            const data = await res.json()
            if(res.status == 200){
                setData(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getCheque = async() => {
        try {
            const res = await fetch("/get-suppliers-cheque", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json()
            if(res.status == 200){
                setData(data)
            }else{
                alert("Error occured, Please try again")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCheque();
    },[])

  return (
    <>
    <div className="cheq_main">
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
                    
                </div>
                <div className="topbar_right">
                    <i className='fa fa-bars' onClick={()=>setMenuBar(true)}></i>
                    <NavLink className="navlink" to="/suppliers">Add Supplier</NavLink>
                    <NavLink className="navlink" to="/suppliers-record">Records</NavLink>
                    <NavLink className="navlink" to="/suppliers-filters">Filters</NavLink>
                    <NavLink className="navlink" to="/suppliers-to-pay">To Pay</NavLink>
                    <NavLink className="navlink" to="/customers-cheque-record">Cheque</NavLink>
                </div>
            </div>
            <div className="bottom">
            <div className="user_table">
            <div className="search_cheque">
                <h2>Cheques Record</h2>
                <div className="inputs">
                    <input type="text" placeholder='Enter Name*' 
                        onChange={(e)=>setSearch(e.target.value)}
                    />
                    <i className='fa fa-search' onClick={searchData}></i>
                </div>
            </div>
                <table>
                    <thead>
                        <tr>
                            <th>Invoice</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Cheque No.</th>
                            <th>Company</th>
                            <th>Issue date</th>
                            <th>Due date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data?data.map((da) => (
                    <>
                    {da.invoices?da.invoices.map((d) => (
                        <>
                        {d.paymentMethod=="Cheque"? 
                        <>
                        <tr>
                            <td>{d.invNo}</td>
                            <td>{da.name}</td>
                            <td>{d.amount}$</td>
                            <td>{d.cheque}</td>
                            <td>{d.company}</td>
                            <td>{d.issue}</td>
                            <td>{d.due}</td>
                            <td
                                style={parseFloat(d.amount)-parseFloat(d.pay)==0?{color:"green"}:{color:"red"}}
                            >{parseFloat(d.amount)-parseFloat(d.pay)==0?"Paid":"Unpaid"}</td>
                        </tr>
                        </>:""
                        }
                        </>
                    )):""}
                    </>
                    )): "No Invoices"}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default SCheque