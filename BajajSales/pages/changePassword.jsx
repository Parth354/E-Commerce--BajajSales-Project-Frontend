import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Button, Input } from "../src/components";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const UserData = useSelector((state) => state.auth.userData);
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { _id } = UserData?.user;
    const { accessToken } = UserData;

    useEffect(() => {
        if (!authStatus) navigate("/login");
    }, [authStatus]);

    const submit = async (newPassword) => {
        const requestBody = {
            ...newPassword,
            _id: _id,
            accessToken: accessToken
        };

        try {
            const response = await fetch(`${process.env.SERVER}/bajajsales/change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const responseData = await response.json();
                setMessage(responseData.message);
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 2000);
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {showMessage && (
                <div className="px-2 py-2 bg-yellow-500 font-bold absolute top-10" style={{ left: "250px" }}>
                    <p>{message}</p>
                </div>
            )}
            <div className="w-full z-0 h-screen flex items-center justify-center " style={{ backgroundImage: `url('/registerbg.jpg')`, backgroundSize: 'cover' }}>
                <div className="z-10 mx-auto w-full max-w-lg bg-black text-white rounded-xl p-10 border border-black/10 bg-opacity-45" >
                    <form onSubmit={handleSubmit(submit)} className=' overflow-y-auto'>
                        <Input
                            label="Old Password :"
                            type="password"
                            placeholder="Enter your old password"
                            {...register("oldPassword")}
                            errors={errors}
                        />
                        <Input
                            label="New Password:"
                            type="password"
                            placeholder="Enter your new password"
                            {...register("newPassword", {
                                required: "New password is required"
                            })}
                            errors={errors}
                        />
                        <Input
                            label="Re-Type New Password:"
                            type="password"
                            placeholder="Please re-type your new password"
                            {...register("retypeNewPassword", {
                                required: "Please re-type your new password",
                                validate: (value) => value === watch("newPassword") || "Passwords do not match"
                            })}
                            errors={errors}
                        />
                        <Button className="my-2" type="submit">Update Detail</Button>
                    </form>
                </div>
            </div>
        </>
    );
}
