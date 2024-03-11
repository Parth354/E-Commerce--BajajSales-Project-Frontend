import React, { useEffect, useRef, useState } from "react";
import { Logo, Container, LogoutBtn } from '../index.js'
import { Link, useNavigate, } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileOptions from "../Profileoptions.jsx";


function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const cart = useSelector((state) => state.cart.cartData)
    const [isHovered, setIsHovered] = useState(false);
    const [searchResult, setSerachResult] = useState()
    const [query, setQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    const [isProfileClicked , setIsProfileClicked] = useState(false)
    const dropdownRef = useRef(null);

    const categories = [
        "Electronics",
        "Clothing & Accessories",
        "Home & Kitchen",
        "Books & Media",
        "Health & Beauty",
        "Toys & Games",
        "Sports & Outdoors",
        "Automotive",
        "Pet Supplies",
        "Jewelry & Watches",
        "Office & School Supplies",
        "Grocery & Gourmet Foods",
        "Furniture",
        "Tools & Home Improvement",
        "Baby & Kids",
        "Travel & Luggage"
    ];

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsSearchOpen(false);
                setIsCategoryOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = async (event) => {
        setQuery(event.target.value);
        if (query) {
            try {
                const response = await fetch(`http://localhost:8000/bajajsales/search?q=${query}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch Search results');
                }
                const { data } = await response.json();
                setSerachResult(data)
                setIsSearchOpen(true);
            }
            catch (error) {
                console.error('Error while searching :', error)
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleInputChange(event)
    };
    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Register",
            slug: "/register",
            active: !authStatus,
        },
        {
            name: "Become Seller",
            slug: "/seller-register",
            active: true,
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
                    <div className="ml-auto flex items-center">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-wrap">
                                <div className="flex w-full">
                                    <button type="submit" onClick={() => setIsCategoryOpen(true)} className="bg-yellow-500 text-black font-medium rounded-l-lg flex items-center px-3"><img src="src/assets/categories-icon.png" className="mx-1" style={{ width: "20px" }}></img><p className="px-1">Category</p></button>
                                    <input type="search" onChange={handleInputChange} placeholder="Search Products" className={"text-black h-8 w-60 px-2 focus:outline-none focus:ring-0"}></input>
                                    <button type="submit" className="bg-yellow-500 rounded-r-lg px-2">
                                        <img src="/search.png" style={{ width: "20px" }}></img></button>
                                </div>
                                {isSearchOpen && searchResult && (<div ref={dropdownRef} className="absolute top-14 bg-black px-2 bg-opacity-55 z-10" style={{ width: "22.5rem" }}>
                                    <ul className="flex flex-wrap">
                                        {searchResult.slice(0, 3).map((item) => (
                                            <li className="w-full py-1" key={item._id}>
                                                <Link to={`/product/${item._id}`} onClick={(e) => { e.stopPropagation(); setIsSearchOpen(false); }}>
                                                    <div className="flex hover:bg-black">
                                                        <img src={item.photos} style={{ height: "35px", width: "35px" }}></img>
                                                        <p className="px-1 font-semibold">{item.title}</p>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))
                                        }
                                    </ul>
                                </div>)}
                                {isCategoryOpen && (
                                    <div ref={dropdownRef} className=" absolute top-14 bg-black px-2 bg-opacity-65 z-20" style={{ width: "30rem" }}>
                                        <div className="flex flex-wrap">
                                            {categories.map((item) => (
                                                <Link to={`/product/category/${item}`}>
                                                    <div className="px-4 py-2  hover:bg-black">
                                                        <p>{item}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>

                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className='inline-bock px-6 py-2 duration-200 hover:bg-white hover:text-black rounded-full'
                                    >{item.name}</button>
                                </li>
                            ) : null
                        )}
                        <li>
                            <button className="hover:bg-white duration-200 hover:text-black hover:font-black rounded-full flex px-6 py-2"
                                onMouseEnter={() => setIsHovered(true)}>
                                <Link to={"/cart"}>
                                    <div className="flex items-center"
                                        onMouseLeave={() => setIsHovered(false)}>
                                        <img src={isHovered ? "/cart(hover).png" : "/cart.png"} style={{ height: "25px", width: "40px" }}></img>
                                        <p className="text-xs">{cart.length}</p>
                                    </div>
                                </Link>
                            </button>
                        </li>
                        {authStatus && (
                            <li>
                                <button className="rounded-full flex px-2 py-1" onClick={()=>setIsProfileClicked(true) }>
                                            <img src="/profile.png" style={{ height: "33px", width: "33px" }}></img>
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </Container >
            {isProfileClicked && authStatus && 
            (
                <ProfileOptions isOpen={()=> setIsProfileClicked(true)} onClose={() => setIsProfileClicked(false)} />
            )}
        </header >
    )
}
export default Header