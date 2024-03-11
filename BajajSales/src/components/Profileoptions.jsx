import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogoutBtn from "./header/LogoutBtn";

export default function ProfileOptions({ isOpen, onClose }) {
    const profileOptions = [
        {
            name: "Your Orders",
            slug: "/user-orders"
        },
        {
            name: "Order Status",
            slug: "/order-status"
        },
        {
            name: "Report a Problem",
            slug: "/report-problem"
        },
        {
            name: "Change Password",
            slug: "/change-password"
        },
    ]
    return (
        <>
            <div className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30 ${isOpen ? 'block' : 'hidden'}`} onClick={onClose}></div>
            <div className={`bg-yellow-400 fixed h-screen flex flex-wrap text-black z-50 top-0 transition-transform duration-1000 ease-in-out ${isOpen ? 'transform translate-x-0' : 'transform translate-x-full'}`} style={{ right: "0", width: '15rem' }}>
                <div className="flex flex-wrap">
                    <div className="hover:cursor-pointer">
                        <p className=" font-black cross px-1 py-1 border-2 border-black ml-2 my-2 hover:bg-black hover:text-white" onClick={onClose}>Close</p>
                    </div>
                    <div>
                        <div>
                            <LogoutBtn />
                        </div>
                        <ul>
                            <Link to={'/user-dashboard'} onClick={onClose}><li className=" hover:underline font-semibold pb-2" style={{ marginTop: "8rem" }}>Your Dashboard</li></Link>
                            {profileOptions.map((item)=>(
                                <Link key={item.slug} to={`${item.slug}` } onClick={onClose} ><li className=" hover:underline font-semibold py-2" >{item.name}</li></Link>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
