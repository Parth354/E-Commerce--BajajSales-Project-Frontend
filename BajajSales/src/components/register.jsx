import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Input } from "./index";

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue } = useForm();
    const [error, setError] = useState("");
    const [showInput, setShowInput] = useState(false);

    const create = async (data) => {
        try {
            const response = await fetch(`${SERVER}/bajajsales/register`, {
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
    const generateOtp = async (email) => {
        try {
            const response = await fetch(`${process.env.SERVER}/bajajsales/email-OTP`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });
        } catch (error) {
            setError(error.message || "OTP generation failed");
        }
    };
    const verifyOTP = async (OTP) => {
        try {
            const response = await fetch(`${process.env.SERVER}/bajajsales/verify-OTP`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ OTP })
            });
        } catch (error) {
            setError(error.message || "OTP generation failed");  
        }
        return response;
    }
    const onSubmit = (data) => {
        if (!showInput) {
            generateOtp(data.email);
            setShowInput(true);
        } else {
            verifyOTP(data.OTP);
            create(data);
            navigate('/login')
        }
    };
    return (
        <div className="flex items-center justify-center h-screen">
            <div className={`mx-auto w-full text-white max-w-lg bg-black rounded-xl p-10 border border-black/10 bg-opacity-45`}>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base ">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name :"
                            placeholder="Enter your Name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email :"
                            placeholder="Enter Email"
                            type="email"
                            {...register("email", {
                                required: true,
                                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            })}
                        />
                        {showInput &&
                            <Input
                                label="OTP :"
                                placeholder="Enter OTP received on your Email"
                                {...register("OTP", {
                                    required: true,
                                })}
                            />
                        }
                        <Input
                            label="Password :"
                            type="password"
                            placeholder="Enter a secure Password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button type="submit" className="w-full"> Create Account </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
