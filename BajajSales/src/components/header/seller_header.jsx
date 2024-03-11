import React from "react";
import { Logo, Container } from '../index.js'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Seller_Header() {
    const sl_authStatus = useSelector((state) => state.sl_auth.sl_status)
    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Dashboard',
            slug: "/seller-dashboard",
            active: true,
        },
        {
            name: "Login",
            slug: "/seller-login",
            active: !sl_authStatus,
        },
        {
            name: "Add Products",
            slug: "/seller-dashboard/addProducts",
            active: sl_authStatus
        },
        {
            name: "Become Seller",
            slug: "/seller-register",
            active: !sl_authStatus,
        },
    ]

    return (
        <header className='py-2 shadow text-white bg-black'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo />

                        </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className='inline-bock px-6 py-2 duration-200 hover:bg-white hover:text-black hover:font-black rounded-full'
                                    >{item.name}</button>
                                </li>
                            ) : null
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}
export default Seller_Header