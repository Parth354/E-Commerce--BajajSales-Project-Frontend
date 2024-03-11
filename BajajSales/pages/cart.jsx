import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { remFromCart, updateQuantity } from "../store/authStore";
import { Button } from "../src/components";

export default function Cart() {
    const cart = useSelector((state) => state.cart.cartData);
    const navigate =useNavigate()
    const quantity = useSelector((state) => state.cart.quantity);
    const dispatch = useDispatch();


    const decrementQuantity = (itemId) => {
        const newQuantity = (quantity[itemId] || 1) - 1;
        console.log(newQuantity)
        if (newQuantity > 0) {
            const dispatched = dispatch(updateQuantity({ _id: itemId, quantity: newQuantity }));
            console.log(dispatched)
        }
    };

    const incrementQuantity = (itemId) => {
        dispatch(updateQuantity({ _id: itemId, quantity: (quantity[itemId] || 1) + 1 }));
    };

    const handleQuantityChange = (event, itemId) => {
        const newQuantity = parseInt(event.target.value);
        if (!isNaN(newQuantity) && newQuantity > 0) {
            dispatch(updateQuantity({ _id: itemId, quantity: newQuantity }));
        }
        else {
            dispatch(updateQuantity({ _id: itemId, quantity: 1 }));
        }
    };

    const totalPrice = cart.reduce((total, item) => {
        const itemPrice = item.price * (quantity[item._id] || 1); // Get item's price, default quantity to 1 if not set
        return total + itemPrice;
    }, 0);

    return (
        <div style={{minHeight:"20rem"}}>
            {cart.length !== 0 ? (
                <div className="flex flex-wrap">
                    <div className="min-w-3/4 px-6">
                        <div className="py-2 px-6 text-2xl font-bold flex" style={{ borderBottom: '1px solid #000' }}>
                            <p>Shopping Cart</p>
                            <p className="ml-auto font-semi font-xl">{cart.length} Items</p>
                        </div>
                        {cart.map(item => (
                            <div key={item._id} className="flex flex-wrap items-center px-2 py-2">
                                <Link to={`/product/${item._id}`}>
                                    <div className="flex">
                                        <div><img src={item.photos} style={{ height: "150px", width: "150px" }} alt="product"></img></div>
                                        <div className="px-6" style={{ width: "18rem" }}>
                                            <p className="py-2">{item.title}</p>
                                            <p className="py-2">${item.price}</p>
                                        </div>
                                    </div>
                                </Link>
                                <div className="px-6" style={{ width: "10rem" }}>
                                    <button className="text-gray-500 font-medium hover:underline" onClick={() => dispatch(remFromCart({ _id: item._id }))}>Remove</button>
                                </div>
                                <div className="px-6">
                                    <button onClick={() => decrementQuantity(item._id)} className="text-2xl font-bold">-</button>
                                    <input type="number" value={quantity[item._id]} onChange={(e) => handleQuantityChange(e, item._id)} className="px-1 rounded-lg border-2" style={{ width: "3rem" }} min="1" />
                                    <button onClick={() => incrementQuantity(item._id)} className="text-2xl font-bold">+</button>
                                </div>
                                <div className="px-6" style={{ width: "8rem" }}>
                                    <p>${(quantity[item._id]) * item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="ml-auto px-2 w-1/4">
                        <div className="py-0.5 flex flex-wrap">
                            <div className="py-2 w-full text-black font-bold text-xl" style={{ borderBottom: '1px solid #000' }}>
                                <p>Order Summary</p>
                            </div>
                            <div className="py-2 px-2 w-full">
                                <p>Total Amount : ${totalPrice} </p>
                                <Button className="my-2" onClick={()=>navigate("/checkout")}>Checkout</Button>
                            </div>

                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-2 justify-center items-center w-full flex flex-wrap">
                    <div className="flex justify-center w-full">
                        <div>
                            <img src="src/assets/emptysb.png" style={{ height: "20rem" }}></img>
                        </div>
                    </div>
                    <div className="font-bold text-1/2xl">
                        <div className="flex justify-center w-full">
                            <div>
                                <p>Empty Cart</p>
                            </div>
                        </div>
                        <div>
                            <p>Add Items To Make Me Happy</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
