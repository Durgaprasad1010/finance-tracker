import React from 'react'
import './styles.css'

function Header
    () {

    function logoutFnc() {
        alert("Logout!")
    }

    return (
        <div className='navbar'>
            <p className='logo'>Financely.</p>
            <p onClick={logoutFnc}>Logout</p>

        </div>
    )
}

export default Header
