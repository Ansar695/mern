import React from 'react'

const FullRecord = () => {
    const newState = 2
  return (
    <div>
        <div className="f_record">
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
                        <p>Add Customer</p>
                        <p className='active_now'>Records</p>
                        <p>Filters</p>
                        <p>To Pay</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FullRecord