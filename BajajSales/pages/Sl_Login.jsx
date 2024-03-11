import React, { useState } from "react";
import { Button, Input, Login as LoginComp } from "../src/components/index.js";
import SlideImageCarousel from "../src/components/slider.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { sl_login } from "../store/authStore.js";

export default function Sl_Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [showInput, setShowInput] = useState(false)
    const generateOtp = async (phoneNo) => {
        try {
            const response = await fetch('http://localhost:8000/bajajsales/smsOTP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNo })
            });
        } catch (error) {
            setError(error.message || "OTP generation failed");
        }
    };
    const verifyOTP = async (OTP, phoneNo) => {
        try {
            const response = await fetch('http://localhost:8000/bajajsales/verifyOTP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ OTP, phoneNo })
            });
            return response;
        } catch (error) {
            setError(error.message || "OTP generation failed");
        }
    }
    const onSubmit = async (data) => {
        if (!showInput) {
            setShowInput(!showInput)
            generateOtp(data.phoneNo)
        }
        else {
            const OtpVerified = await verifyOTP(data.OTP,data.phoneNo)
            if (OtpVerified.ok) {
                const response = await fetch('http://localhost:8000/bajajsales/seller-login', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                if (response.ok) {
                    const result = await response.json()
                    const { data } = result
                    if (data) {
                        dispatch(sl_login({sellerData:data}))
                        navigate("/seller-dashboard")
                    }
                }
            }
        }
    }
    return (
        <div className="flex w-full h-screen overflow-hidden">
            <div className="w-3/5">
                <SlideImageCarousel />
            </div>
            <div className=" w-2/5 flex justify-center h-screen ">
                <div className={`my-2 w-full text-black max-w-lg rounded-xl p-10 border border-black/10 bg-opacity-45`}>
                    <h2 className="text-center text-2xl font-bold leading-tight">Take Your Business Online</h2>
                    <p className="mt-1 text-center text-base ">
                        Not Registered ?&nbsp;
                        <Link
                            to="/seller-register"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <p className=" font-semibold py-2">Fill the Details to log in to Seller Dashboard</p>
                        <Input
                            label="Phone Number :"
                            placeholder="Enter registered Number"
                            {...register("phoneNo", {
                                required: true,
                            })}
                        />
                        <Input
                            label="OTP :"
                            placeholder="Enter OTP recieved on Mobile Phone"
                            {...register("OTP", {
                            })}
                        />
                        {!showInput && <Button type="submit" className="mt-2 w-full">Generate OTP</Button>}
                        {showInput && <Button type="submit" className="mt-2 w-full">Login</Button>}
                    </form>
                </div>
            </div>
        </div>
    )
}
