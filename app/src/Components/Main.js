import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import pageContext from '../Context/pages/pageContext'
import Alert from './Alert'
import NavBar from './NavBar'
import headimg from "../images/headimg.jpg"

export default function Main() {
    const context = useContext(pageContext);
    const { alert, showAlert } = context;

    useEffect(() => {
        showAlert("It is Your Online Personal Dairy. Keeping your feelings secure and with you always... ", "primary")
    }, [])
    return (
        <div>
            <div className='fixed-top'>
                <NavBar />
            </div>

            <img className="head-img" src={headimg} alt="head-img" />

            <div className="container ">
                <Outlet />
            </div>

            {alert === null ? <></> : <Alert alert={alert} />}
        </div>
    )
}