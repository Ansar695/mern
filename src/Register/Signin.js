import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import "./signin.css"

const Signin = () => {
    const navigate = useNavigate()
    const[show, setShow] = useState(false)
    const[user, setUser] = useState()
    const[state, setState] = useState(1)
    const[password, setPassword] = useState()
    const[prevPassword, setPrevPassword] = useState()
    const[prevUser, setPrevUser] = useState()

    const updatePassword = async(e) => {
        if(user == null|| password == null){
            alert("Please enter details")
        }else{
            try {
                console.log(prevUser,prevPassword)
                const res = await fetch("/signin_user_update", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({prevUser,prevPassword, user, password})
                })
                const data = await res.json()
                if(res.status === 200){
                    alert("Updated Successfull...")
                    setState(1)
                    setUser("")
                    setPassword("")
                }else{
                    alert("Not Updated. Try again")
                    setUser("")
                    setPassword("")
                }
            } catch (error) {
                console.log(error)
                alert("Something went wrong. Please try again.")
                setUser("")
                setPassword("")
            }
        }
    }

    const submitData = async(e) => {
        if(user == null|| password == null){
            alert("Please enter details")
        }else{
            try {
                const res = await fetch("/signin_user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({user,password})
                })
                const data = await res.json()
                console.log(data)
                if(res.status === 200){
                    alert("Sign in Successfull...")
                    navigate("/home")
                    setUser("")
                    setPassword("")
                }else{
                    alert("Invalid Email or password.")
                    setUser("")
                    setPassword("")
                }
            } catch (error) {
                console.log(error)
                alert("Something went wrong, Please try again.")
                setUser("")
                setPassword("")
            }
        }
    }

    const proceedNext = async(e) => {
        if(user == null|| password == null){
            alert("Please enter details")
        }else{
            try {
                const res = await fetch("/signin_user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({user,password})
                })
                const data = await res.json()
                if(res.status === 200){
                    setState(3)
                    setUser("")
                    setPassword("")
                }else{
                    alert("Invalid Email or password.")
                    setUser("")
                    setPassword("")
                }
            } catch (error) {
                console.log(error)
                alert("Something went wrong. Please try again.")
                setUser("")
                setPassword("")
            }
        }
    } 

  return (
    <>
        <div className="sign_main">
            <div className={`inner ${state===1?'':'inner_active'}`}>
                <h2>Sign In</h2>
                <input type="text" value={user} onChange={(e)=>setUser(e.target.value)} placeholder="Enter Username." />
                <input type={`${show?'text':'password'}`} value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Enter Password." />
                <div className="box">
                    <input type="checkbox" onChange={()=>setShow(!show)} /><label>Show Password</label>
                </div>
                <div className="btns">
                    <button onClick={submitData}>Sign In</button>
                    <button onClick={(e)=>setState(2)}>Change Password</button>
                </div>
            </div>

            <div className={`inner_prev ${state===2?'':'inner_prev_active'}`}>
                <h2>Sign In</h2>
                <input type="text" value={prevUser} onChange={(e)=>setPrevUser(e.target.value)} placeholder="Enter Previous Username." />
                <input type={`${show?'text':'password'}`} value={prevPassword} onChange={(e)=>setPrevPassword(e.target.value)}  placeholder="Enter Previous Password." />
                <div className="box">
                    <input type="checkbox" onChange={()=>setShow(!show)}/><label>Show Password</label>
                </div>
                <div className="btns">
                    <button onClick={(e)=>setState(1)}>Back</button>
                    <button onClick={(e)=>proceedNext()}>Next</button>
                </div>
            </div>

            <div className={`inner_next ${state===3?'':'inner_next_active'}`}>
                <h2>Sign In</h2>
                <input type="text" value={user} onChange={(e)=>setUser(e.target.value)} placeholder="Enter New Username." />
                <input type={`${show?'text':'password'}`} value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Enter New Password." />
                <div className="box">
                    <input type="checkbox" onChange={()=>setShow(!show)}/><label>Show Password</label>
                </div>
                <div className="btns">
                    <button onClick={(e)=>setState(2)}>Back</button>
                    <button onClick={updatePassword}>Update</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Signin