import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "./index";
import SlideImageCarousel from "./slider";
import { sl_login } from "../../store/authStore";

export default function sellerRegister() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, getValues } = useForm();
    const [error, setError] = useState("");
    const [showInput, setShowInput] = useState(1);

    const create = async (data) => {
        try {
            const response = await fetch('http://localhost:8000/bajajsales/seller-register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            setError(error.message || "Registration failed");
        }
    };
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
        if (showInput <= 2) {
            setShowInput(showInput + 1);
        } if (showInput === 3) {
            const otpResponse = await verifyOTP(data.OTP, data.phoneNo);
            console.log(otpResponse)
            if (otpResponse.ok) {
                await create(data);
                navigate('/seller-login');
            } else {
                setError("OTP verification failed");
            }
        }
    }
    const back = () => {
        if (showInput > 1) {
            setShowInput(showInput - 1);
        }
    }
    const indianStates = ["Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi",
        "Ladakh",
        "Lakshadweep",
        "Puducherry"]

    return (
        <div className="flex w-full h-screen overflow-hidden">
            <div className="w-3/5">
                <SlideImageCarousel />
            </div>
            <div className=" w-2/5 flex justify-center h-screen ">
                <div className={`my-2 w-full text-black max-w-lg rounded-xl p-10 border border-black/10 bg-opacity-45`}>
                    <h2 className="text-center text-2xl font-bold leading-tight">Take Your Business Online</h2>
                    <p className="mt-1 text-center text-base ">
                        Already Registered Seller?&nbsp;
                        <Link
                            to="/seller-login"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {showInput > 1 && <div className="mt-3 bg-white text-black cursor-pointer" onClick={back}><img src="src/assets/back.png" style={{ height: "30px", width: "35px" }}></img></div>}
                        <div className='mt-1 space-y-5'>
                            {showInput === 1 && <>
                                <p className=" font-semibold">Fill this Form to become a Seller Partner</p>
                                <Input
                                    label="*Enterprise Name :"
                                    placeholder="Enter Comapny Proprietary Name"
                                    {...register("enterpriseName", {
                                        required: true,
                                    })}
                                />
                                <Input
                                    label="GST Number :"
                                    placeholder="Enter GST Number"
                                    {...register("GSTno", {
                                    })}
                                />
                            </>
                            }
                            {showInput == 2 && <>
                                <p className="font-bold">Enterprise Address</p>
                                <Input
                                    label="Office Locality :"
                                    placeholder="Enter Office Address :"
                                    {...register("locality", {
                                    })}
                                />

                                <Select label="State :" options={indianStates}
                                    className="mb-4"
                                    {...register("state", { required: true })}
                                />

                                <Input
                                    label="Pin Code :"
                                    placeholder="Pin Code "
                                    {...register("pincode", {
                                        required: true,
                                        pattern: {
                                            value: /^[0-9]{6}$/,
                                            message: "Please enter a 6-digit Pin Code"
                                        }
                                    })}
                                />
                            </>
                            }

                            {showInput == 3 && <>
                                <p className="font-bold">Contact Details</p>
                                <Input
                                    label="Phone Number :"
                                    placeholder="Enter your Phone Number"
                                    {...register("phoneNo", {
                                        required: true,
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "Please enter a 10-digit phone number"
                                        }
                                    })}
                                />
                                <Button onClick={() => generateOtp(getValues("phoneNo"))} className="w-full"> Generate OTP </Button>
                            </>
                            }
                            {showInput == 3 &&
                                <Input
                                    label="OTP :"
                                    placeholder="Enter OTP received on your Email"
                                    {...register("OTP", {
                                        required: true,
                                    })}
                                />
                            }
                            {showInput <= 2 &&
                                <Button type="button" className="w-full"> Next </Button>
                            }
                            {showInput == 3 && <Button type="submit" className="w-full"> Register as Seller </Button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}
