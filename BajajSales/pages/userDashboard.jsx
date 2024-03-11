import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../src/components";
import Select from "../src/components/select";
import { login } from "../store/authStore";

export default function UserDashboard() {
    const authStatus = useSelector((state) => state.auth.status);
    const currentData = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit } = useForm({});
    const navigate = useNavigate();
    const fileInputRef = useRef();

    const Update = (async (user_info) => {
        try {
            const formData = new FormData();
            Object.entries(user_info).forEach(([key, value]) => {
                if (key === 'avatar') {
                    for (let i = 0; i < value.length; i++) {
                        formData.append(key, value[i]);
                    }
                } else {
                    formData.append(key, value);
                }
            });
            formData.append("_id", `${currentData?.user._id}`);
            formData.append("accessToken", `${currentData?.accessToken}`);
            const response = await fetch('http://localhost:8000/bajajsales/update-userDetails', {
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            });
            if (!response.ok) {
                throw new Error('Failed to update user details');
            }
            const { updatedData } = await response.json();
            if (updatedData) dispatch(login({ userData: updatedData }));
        } catch (error) {
            console.log(error);
        }
        console.log("worked")
    })

    useEffect(() => {
        if (!authStatus) navigate('/login');
    }, [authStatus]);

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
        "Puducherry"];

    return (
        <div className="w-full z-0 h-screen flex items-center justify-center " style={{ backgroundImage: `url('/registerbg.jpg')`, backgroundSize: 'cover', }}>
            <div className="z-10 mx-auto w-full max-w-lg bg-black text-white rounded-xl p-10 border border-black/10 bg-opacity-45" >
                <div className="container -mr-10" style={{ maxHeight: '480px', overflowY: 'auto' }}>
                    <form onSubmit={handleSubmit(Update)} className=' overflow-y-auto'>                
                    <div className="flex justify-center w-full">
                            <Input
                                type="file"
                                divWidth="w-0"
                                style={{ display: "none" }}
                                {...register("avatar", {
                                    required: "Avatar is Required"
                                })}
                                ref={fileInputRef}
                                error={errors}                        
                            />
                            <button type="button" onClick={() => fileInputRef.current.click()}><img src={currentData?.user.avatar ? `${currentData?.user.avatar}` : "src/assets/profile.png"} style={{ width: "170px", height: "170px", borderRadius: "100%" }} /></button>
                        </div>
                        <p className="font-bold py-2 px-1">Personal Details :</p>
                        <Input
                            label="Name :"
                            type="text"
                            value={currentData?.user.name}
                            readOnly
                            placeholder="Enter your Name "
                            {...register("name", {
                                required: "Name is required",
                            })}
                            errors={errors}
                        />
                        <Input
                            label="Age :"
                            type="number"
                            placeholder="Enter your Age "
                            {...register("age", {
                                required: "Age is required",
                            })}
                            errors={errors}
                        />
                        <p className="font-bold py-2 px-1">Contact Details :</p>
                        <Input
                            label="Phone Number :"
                            placeholder="Enter your Phone Number"
                            {...register("phoneNo", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Please enter a 10-digit phone number"
                                }
                            })}
                            errors={errors}
                        />
                        <Input
                            label="Email :"
                            placeholder="Enter your email"
                            value={currentData?.user.email}
                            type="email"
                            readOnly
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                            errors={errors}
                        />
                        <p className="font-bold py-2 px-1">Address :</p>
                        <Input
                            label="Locality :"
                            type="text"
                            placeholder="House No. / Street / Appartment Name"
                            {...register("locality", {
                                required: "Locality is required",
                            })}
                            errors={errors}
                        />
                        <Select label="State :" options={indianStates}
                            className="mb-2"
                            {...register("state", { required: "State is required" })}
                            errors={errors}
                        />

                        <Input
                            label="Pin Code :"
                            placeholder="Pin Code "
                            {...register("pincode", {
                                required: "Pin code is required",
                                pattern: {
                                    value: /^[0-9]{6}$/,
                                    message: "Please enter a 6-digit Pin Code"
                                }
                            })}
                            errors={errors}
                        />
                        <Button className="my-2" type="submit">Update Detail</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
