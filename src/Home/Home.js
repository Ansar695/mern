import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import "./Home.css"
import Sidebar from './Sidebar';

const Home = () => {
    const[customers, setCustomers] = useState()
    const[totalCus, setTotalCus] = useState()
    const[totalCus_topay, setTotalCus_topay] = useState()
    const[totalCus_paid, setTotalCus_paid] = useState()

    const[totalSup, setTotalSup] = useState()
    const[totalSup_topay, setTotalSup_topay] = useState()
    const[totalSup_paid, setTotalSup_paid] = useState()

    const[totalAmount, setTotalAmount] = useState()
    const[totalTopay, setTotalTopay] = useState()
    
    const[totalSupAmount, setTotalSupAmount] = useState()
    const[totalSupTopay, setTotalSupTopay] = useState()

    const newState = 1;

    const getCustomers = async(e) => {
        let total = 0;
        let t_paid = 0;
        let t_topay = 0;
        let amount=0
        let paid=0;
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
                data.map((d) => {
                    if(d){
                        total = total+1
                        amount = parseFloat(amount)+parseFloat(d.amount)
                        paid = parseFloat(paid)+parseFloat(d.paid)
                        if(parseFloat(d.amount) === parseFloat(d.paid)){
                            t_paid = t_paid + 1
                        }
                        if(parseFloat(d.amount) !== parseFloat(d.paid)){
                            t_topay = t_topay+1
                        }
                    }
                })
                setTotalCus(total)
                setTotalCus_paid(t_paid)
                setTotalCus_topay(t_topay)
                setTotalAmount(amount)
                setTotalTopay(amount-paid)
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getSuppliers = async(e) => {
        let total = 0;
        let t_paid = 0;
        let t_topay = 0;
        let amount=0
        let paid=0;
        try {
            const res = await fetch("/get-suppliers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json()
            if(res.status == 200){
                setCustomers(data)
                data.map((d) => {
                    if(d){
                        total = total+1
                        amount = parseFloat(amount)+parseFloat(d.amount)
                        paid = parseFloat(paid)+parseFloat(d.paid)
                        if(parseFloat(d.amount) === parseFloat(d.paid)){
                            t_paid = t_paid + 1
                        }
                        if(parseFloat(d.amount) !== parseFloat(d.paid)){
                            t_topay = t_topay+1
                        }
                    }
                })
                setTotalSup(total)
                setTotalSup_paid(t_paid)
                setTotalSup_topay(t_topay)
                setTotalSupAmount(amount)
                setTotalSupTopay(amount-paid)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCustomers()
        getSuppliers()
    },[])

  return (
      <>
          <div className="home_main">
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
                          <NavLink className="navlink" to="/"><p>Logout</p></NavLink>
                      </div>
                  </div>
                  <div className="bottom">
                      <div className="owner_info">
                          <div className="bottom_left">
                              <div className="img">
                                  <img src="./Images/avt.jpg" alt="" />
                              </div>
                              <div className="content">
                                  <button>Email Now</button>
                              </div>
                          </div>
                          <div className="bottom_right">
                              <h3>Ayan Food</h3>
                              <small>Owner</small>
                              <p>Address: Birmingham</p>
                              <p>Company: Ayan Food Ltd</p>
                          </div>
                      </div>

                      <div className="about_customers">
                      <h3>Information</h3>
                          <div className="card_wrapper">
                              <div className="card">
                                  <p>Total Customers</p>
                                  <h3>{totalCus} <small>customers</small></h3>
                                  <div className="paid">
                                      <p className='paid_users'>
                                          Paid <br />
                                          <strong>{totalCus_paid}</strong>
                                      </p>
                                      <p className='topay_users'>
                                          To Pay <br />
                                          <strong>{totalCus_topay}</strong>
                                      </p>
                                  </div>
                              </div>

                              <div className="card">
                                  <p>Total Suppliers</p>
                                  <h3>{totalSup} <small>suppliers</small></h3>
                                  <div className="paid">
                                      <p className='paid_users'>
                                          Paid <br />
                                          <strong>{totalSup_paid}</strong>
                                      </p>
                                      <p className='topay_users'>
                                          To Pay <br />
                                          <strong>{totalSup_topay}</strong>
                                      </p>
                                  </div>
                              </div>

                              <div className="card_payment">
                                  <h2>Payment History</h2>
                                  <div className="payment_inner">
                                    <div className="left">
                                        <h3>Customers</h3>
                                        <p><strong>Total:</strong> {totalAmount}</p>
                                        <p><strong>To Pay:</strong> {totalTopay}</p>
                                    </div>
                                    <div className="right">
                                        <h3>Suppliers</h3>
                                        <p><strong>Total:</strong> {totalSupAmount}</p>
                                        <p><strong>To Pay:</strong> {totalSupTopay}</p>
                                    </div>
                                  </div>
                              </div>


                          </div>
                      </div>
                  </div>
              <div className="test"></div>
              </div>
          </div>
      </>
  );
};

export default Home;
