import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../src/components";

export default function Checkout() {
    const authStatus = useSelector((state) => state.auth.status);
    const { address } = useSelector((state) => state.auth.userData.user);
    const navigate = useNavigate();
    const [navigationReason, setNavigationReason] = useState("");

    useEffect(() => {
        if (!authStatus) navigate('/login')
        // if (!address) {
        //     setNavigationReason("Please provide your address to proceed.");
        //     return;
        // }
    }, [authStatus, address, navigate]);

    if (navigationReason) {
        return (
            <div className="flex items-center w-full justify-center" style={{minHeight:"19.7rem"}}>
                <p className="font-black">{navigationReason}</p>
                <Button className="mx-1" onClick = {()=>navigate("/user-dashboard") }> Update Address</Button>
            </div>
        );
    }

    return (
        <>
            <p>Hello Checkout</p>
        </>
    );
}
